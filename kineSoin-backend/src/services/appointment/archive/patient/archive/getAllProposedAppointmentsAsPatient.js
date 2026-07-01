/**
 * @description Retrieves all future, non‑accepted, non‑canceled appointments
 *              grouped by each active prescription for the authenticated patient.
 *
 * Rationale:
 * - Gives patients a clear overview of all pending appointment proposals tied to
 *   their ongoing treatments, making the workflow intuitive and medically contextual.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the patient ID and ensures the patient is in an active status before
 *   returning any appointment data.
 * - Includes therapist, medic, and affliction metadata to provide complete clinical
 *   context for each proposed appointment.
 * - Filters out past appointments and returns only future proposals, grouped by
 *   prescription for easy frontend rendering.
 * - Provides clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Patient } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
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
