/**
 * @description Retrieves all appointments for a specific patient, accessible only
 *              to the authenticated therapist, and categorizes them into past and
 *              upcoming entries with full clinical context.
 *
 * Rationale:
 * - Ensures therapists can securely review a patient’s complete appointment history,
 *   preserving data integrity and preventing unauthorized access.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist and patient IDs before performing any read operation.
 * - Enriches each appointment with therapist, prescription, medic, and affliction
 *   metadata to provide a full clinical picture.
 * - Categorizes appointments using precise date/time comparison for intuitive
 *   frontend rendering.
 * - Provides clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Appointment, Patient, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import getAppointmentDateTime from '../../../utils/getAppointmentDateTime.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getPatientAppointmentsAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  try {
    const patient_id = getValidId(req.params.patient_id, 'Patient ID');

    const foundPatient = await Patient.findOne({
      where: { id: patient_id },
      attributes: ['id', 'name', 'surname', 'picture_url'],
    });

    if (!foundPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const foundAppointments = await Appointment.findAll({
      where: { patient_id },
      attributes: {
        exclude: ['created_at', 'updated_at', 'therapist_id'],
      },
      order: [
        ['date', 'ASC'],
        ['time', 'ASC'],
      ],
      include: [
        {
          association: 'therapist',
          attributes: ['id', 'name', 'surname'],
        },
        {
          association: 'prescription',
          attributes: {
            exclude: [
              'created_at',
              'updated_at',
              'affliction_id',
              'medic_id',
              'picture_id',
              'prescription_id',
            ],
          },
          include: [
            {
              association: 'medic',
              attributes: [
                'id',
                'name',
                'surname',
                'email',
                'prefix',
                'phone_number',
              ],
            },
            {
              association: 'affliction',
              attributes: ['id', 'name', 'description'],
            },
          ],
        },
      ],
    });

    if (!foundAppointments || foundAppointments.length === 0) {
      return res
        .status(404)
        .json({ error: 'No appointments found for this patient' });
    } else {
      const previousAppointments = foundAppointments.filter((appointment) => {
        const appointmentDateTime = getAppointmentDateTime(
          appointment.date,
          appointment.time
        );
        return appointmentDateTime < new Date();
      });

      const upcomingAppointments = foundAppointments.filter((appointment) => {
        const appointmentDateTime = getAppointmentDateTime(
          appointment.date,
          appointment.time
        );
        return appointmentDateTime >= new Date();
      });

      return res.status(200).json({
        previousAppointments,
        upcomingAppointments,
        patient: {
          id: foundPatient.id,
          fullName: `${foundPatient.name} ${foundPatient.surname}`,
          picture_url: foundPatient.picture_url,
          status: foundPatient.status,
        },
      });
    }
  } catch (error) {
    console.error('Error fetching patient appointments:', error);

    return res.status(500).json({
      message: 'Error fetching patient appointments:',
      error: error.message,
    });
  }
}
