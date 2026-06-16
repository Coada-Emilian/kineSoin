/**
 * @description Retrieves all proposed (non-accepted, non-canceled, and future) appointments
 *              for the logged-in patient, grouped by active (not completed) prescriptions.
 *
 * This function performs the following:
 * - Validates the patient ID.
 * - Fetches the patient by ID including:
 *   - Active prescriptions (is_completed: false),
 *   - Each prescription's non-canceled and non-accepted appointments,
 *   - Associated therapist, medic, and affliction details.
 * - Checks the patient's status using a helper function.
 * - Filters appointments to only those with date/time in the future.
 * - Constructs and returns a JSON array where each element contains:
 *   - prescription ID,
 *   - proposed appointments (future, non-accepted, non-canceled),
 *   - medic information,
 *   - affliction information.
 *
 * @param {object} req - Express request object containing patient_id in req.patient_id
 * @param {object} res - Express response object used to send JSON response
 *
 * @returns {object[]} JSON array of proposed appointments grouped by prescription
 */

import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Patient } from '../../../models/index.js';
import { checkPatientStatus } from '../../checkPatientStatus.js';

export default async function getAllProposedAppointmentsAsPatient(req, res) {
  const patientId = parseInt(req.patient_id, 10);

  checkIsValidNumber(patientId);

  const foundPatient = await Patient.findByPk(patientId, {
    attributes: ['id', 'name', 'surname', 'status'],
    include: [
      {
        association: 'prescriptions',
        where: { is_completed: false },
        attributes: ['id', 'appointment_quantity', 'at_home_care', 'date'],
        required: false,
        include: [
          {
            association: 'appointments',
            where: { is_canceled: false } && { is_accepted: false },
            required: false,
            attributes: ['id', 'date', 'time'],
            include: [
              {
                association: 'therapist',
                required: false,
                attributes: ['name', 'surname'],
              },
            ],
          },
          {
            association: 'medic',
            required: false,
            attributes: ['name', 'surname'],
          },
          {
            association: 'affliction',
            required: false,
            attributes: ['name', 'description'],
          },
        ],
      },
    ],
  });

  checkPatientStatus(foundPatient);

  const sentData = [];

  for (const prescription of foundPatient.prescriptions) {
    const medic = prescription.medic;

    const affliction = prescription.affliction;

    const allAppointments = prescription.appointments;

    const currentDate = new Date();

    const proposedAppointments = allAppointments.filter((appointment) => {
      const appointmentDateTime = new Date(
        `${appointment.date}T${appointment.time}`
      );

      return appointmentDateTime > currentDate;
    });

    const sentInformation = {
      prescription_id: prescription.id,
      proposedAppointments: proposedAppointments,
      medic: medic,
      affliction: affliction,
    };
    sentData.push(sentInformation);
  }

  res.status(200).json(sentData);
}
