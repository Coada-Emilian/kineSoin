import { Appointment, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAppointmentDashboardDataAsTherapist({
  therapistId,
}) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  const currentDate = new Date().toISOString().split('T')[0];

  const sameDayAppointments = await Appointment.findAll({
    attributes: ['id', 'date', 'time'],
    where: {
      therapist_id,
      is_accepted: true,
      is_canceled: false,
      date: currentDate,
    },
    order: [['time', 'ASC']],
    include: [
      {
        association: 'patient',
        attributes: ['id', 'name', 'surname', 'picture_url'],
      },
      {
        association: 'prescription',
        attributes: ['id', 'appointment_quantity'],
        include: [
          {
            association: 'affliction',
            attributes: ['id', 'name', 'description', 'insurance_code'],
          },
        ],
      },
    ],
  });

  return sameDayAppointments;
}
