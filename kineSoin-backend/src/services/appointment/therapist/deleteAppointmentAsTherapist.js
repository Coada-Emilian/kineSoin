import { Appointment, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteAppointmentAsTherapist({
  therapistId,
  appointmentId,
}) {
  const therapist_id = getValidId(therapistId, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  const appointment_id = getValidId(appointmentId, 'Appointment ID');

  await findOrThrow(Appointment, appointment_id, 'Appointment');

  return await Appointment.destroy({
    where: { id: appointment_id, therapist_id },
  });
}
