import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Appointment } from '../../../models/index.js';

export default async function getTherapistDashboardData(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      checkIsValidNumber(therapist_id);

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

      if (sameDayAppointments.length > 0) {
        return res.status(200).json({ sameDayAppointments });
      } else {
        return res.status(200).json({ message: 'No appointments today' });
      }
    } catch (error) {
      console.error('Error fetching therapist dashboard data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
