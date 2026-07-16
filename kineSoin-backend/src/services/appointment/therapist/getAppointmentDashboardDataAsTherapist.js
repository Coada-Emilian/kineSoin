import { Op } from 'sequelize';
import { Appointment, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAppointmentDashboardDataAsTherapist({
  therapistId,
}) {
  const therapist_id = getValidId(therapistId, 'Therapist ID');

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
        attributes: [
          'id',
          'name',
          'surname',
          'picture_url',
          'email',
          'prefix',
          'phone_number',
        ],
      },
      {
        association: 'prescription',
        attributes: [
          'id',
          'appointment_quantity',
          'completed_appointment_quantity',
          'is_completed',
          'at_home_care',
          'date',
          'picture_url',
          'prescription_number',
        ],
        include: [
          {
            association: 'affliction',
            attributes: ['id', 'name', 'description', 'insurance_code'],
            include: [
              { association: 'body_region', attributes: ['id', 'name'] },
            ],
          },
          { association: 'medic', attributes: ['id', 'name', 'surname'] },
        ],
      },
    ],
  });

  for (const appointment of sameDayAppointments) {
    const lastAppointmentForPatient = await Appointment.findOne({
      attributes: ['date', 'time'],
      where: {
        patient_id: appointment.patient.id,
        is_accepted: true,
        is_canceled: false,
        [Op.or]: [
          {
            date: {
              [Op.lt]: appointment.date,
            },
          },
          {
            date: appointment.date,
            time: {
              [Op.lt]: appointment.time,
            },
          },
        ],
      },
      order: [
        ['date', 'DESC'],
        ['time', 'DESC'],
      ],
    });

    appointment.dataValues.lastAppointmentAt = lastAppointmentForPatient
      ? new Date(
          `${lastAppointmentForPatient.date}T${lastAppointmentForPatient.time}`
        )
      : null;
  }

  return sameDayAppointments;
}
