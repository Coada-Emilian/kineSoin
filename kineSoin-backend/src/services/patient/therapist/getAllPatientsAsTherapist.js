import { Patient, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllPatientsAsTherapist({ therapistId }) {
  const therapist_id = getValidId(therapistId, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  const foundPatients = await Patient.findAll({
    order: [
      ['status', 'ASC'],
      ['therapist_id', 'ASC'],
      ['name', 'ASC'],
    ],
    attributes: [
      'id',
      'name',
      'surname',
      'status',
      'picture_url',
      'email',
      'prefix',
      'phone_number',
      'created_at',
    ],
    include: [
      {
        association: 'therapist',
        attributes: ['id', 'name', 'surname', 'picture_url'],
      },
      {
        association: 'appointments',
        attributes: ['date', 'time'],
      },
    ],
  });

  const sentPatients = foundPatients.map((patient) => ({
    id: patient.id,
    status: patient.status,
    fullName: `${patient.name} ${patient.surname}`,
    picture_url: patient.picture_url,
    email: patient.email,
    fullPhoneNumber: `${patient.prefix} ${patient.phone_number}`,
    createdAt: patient.created_at,
    therapist: patient.therapist
      ? {
          id: patient.therapist.id,
          fullName: `${patient.therapist.name || ''} ${patient.therapist.surname || ''}`,
          picture_url: patient.therapist.picture_url || null,
        }
      : null,
    lastAppointmentAt:
      patient.appointments.length > 0
        ? patient.appointments
            .reduce((latest, appointment) => {
              const appointmentDateTime = new Date(
                `${appointment.date}T${appointment.time}`
              );
              return appointmentDateTime > latest
                ? appointmentDateTime
                : latest;
            }, new Date(0))
            .toISOString()
        : null,
  }));

  return sentPatients;
}
