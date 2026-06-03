import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Appointment, Patient } from '../../../models/index.js';

export default async function getPatientAppointmentsAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ error: 'Invalid therapist ID' });
  } else {
    checkIsValidNumber(therapist_id);

    const patient_id = parseInt(req.params.patient_id, 10);

    if (!patient_id) {
      return res.status(400).json({ error: 'Invalid patient ID' });
    } else {
      checkIsValidNumber(patient_id);

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
        const currentDate = new Date();
        const currentTime = currentDate.toTimeString().split(' ')[0]; // Get current time in HH:MM:SS format

        function getAppointmentDateTime(dateStr, timeStr) {
          return new Date(`${dateStr}T${timeStr}`);
        }

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

        const foundPatient = await Patient.findOne({
          where: { id: patient_id },
          attributes: ['id', 'name', 'surname', 'picture_url'],
        });

        if (!foundPatient) {
          return res.status(404).json({ error: 'Patient not found' });
        }

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
    }
  }
}
