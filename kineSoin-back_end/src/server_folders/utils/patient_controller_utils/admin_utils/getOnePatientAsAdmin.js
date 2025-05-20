import { Patient } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getOnePatientAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const patient_id = parseInt(req.params.patient_id, 10);

      checkIsValidNumber(patient_id);

      const foundPatient = await Patient.findByPk(patient_id, {
        attributes: {
          exclude: [
            'password',
            'old_password',
            'new_password',
            'repeated_password',
            'created_at',
            'updated_at',
            'picture_id',
          ],
        },
        include: [
          {
            association: 'prescriptions',
            attributes: [
              'id',
              'appointment_quantity',
              'is_completed',
              'at_home_care',
              'date',
            ],
            include: [
              {
                association: 'medic',
                attributes: ['id', 'name', 'surname'],
              },
              {
                association: 'affliction',
                attributes: ['id', 'name', 'description'],
              },
              {
                association: 'appointments',
                attributes: ['id', 'is_canceled', 'date', 'time'],
              },
            ],
          },
          { association: 'therapist' },
        ],
      });

      if (!foundPatient) {
        return res.status(400).json({ message: 'Patient not found' });
      }

      const currentDate = new Date().toISOString().split('T')[0];
      const currentTime = new Date().toISOString().split('T')[1].split('.')[0];

      const newPrescriptions =
        foundPatient.prescriptions?.map((prescription) => {
          const pastAppointments = [];
          const upcomingAppointments = [];

          prescription.appointments?.forEach((appointment) => {
            if (
              appointment.date < currentDate ||
              (appointment.date === currentDate &&
                appointment.time < currentTime)
            ) {
              pastAppointments.push(appointment);
            } else {
              upcomingAppointments.push(appointment);
            }
          });

          return {
            id: prescription.id,
            appointment_quantity: prescription.appointment_quantity,
            is_completed: prescription.is_completed,
            at_home_care: prescription.at_home_care,
            date: prescription.date,
            past_appointments: pastAppointments,
            upcoming_appointments: upcomingAppointments,
          };
        }) || []; // Default to an empty array if no prescriptions

      const fullPhoneNumber = foundPatient.prefix + foundPatient.phone_number;

      const sentPatient = {
        id: foundPatient.id,
        name: foundPatient.name,
        surname: foundPatient.surname,
        fullName: `${foundPatient.name} ${foundPatient.surname}`,
        age: computeAge(foundPatient.birth_date),
        gender: foundPatient.gender,
        city: foundPatient.city,
        street_name: foundPatient.street_name,
        street_number: foundPatient.street_number,
        postal_code: foundPatient.postal_code,
        address: `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`,
        phone_number: foundPatient.phone_number,
        prefix: foundPatient.prefix,
        full_phone_number: fullPhoneNumber,
        therapist: foundPatient.therapist
          ? `${foundPatient.therapist.name} ${foundPatient.therapist.surname}`
          : null,
        status: foundPatient.status,
        picture_url: foundPatient.picture_url,
        prescriptions: newPrescriptions,
        medic: foundPatient.prescriptions?.[0]?.medic || null,
        email: foundPatient.email,
      };

      return res.status(200).json(sentPatient);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
