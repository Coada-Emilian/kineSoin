import { Appointment } from '../../../models/index.js';

export default async function proposeOneAppointmentAsTherapist(req, res) {
  // const therapistId = parseInt(req.body.therapist_id, 10);

  // const prescriptionId = parseInt(req.body.prescription_id, 10);

  // const patientId = parseInt(req.patient_id, 10);

  const therapist_id = 1;

  const newAppointmentSchema = Joi.object({
    date: Joi.date().required(),
    time: Joi.string().required(),
    patientId: Joi.number().required(),
    prescriptionId: Joi.number().required(),
  });

  if (!req.body) {
    return res.status(400).json({
      message: 'The body of the request is empty',
    });
  }

  const { error } = newAppointmentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'The body of the request is not valid',
      error: error.details[0].message,
    });
  }

  const { date, time, patient_id, prescription_id } = req.body;

  const allAppointments = await Appointment.findAll();

  const existingAppointment = allAppointments.find(
    (appointment) => appointment.date === date && appointment.time === time
  );

  if (existingAppointment) {
    return res.status(400).json({
      message: 'An appointment already exists at this date and time',
    });
  } else {
    const newAppointment = await Appointment.create({
      therapist_id,
      prescription_id,
      patient_id,
      is_canceled: false,
      is_accepted: false,
      date,
      time,
    });

    if (!newAppointment) {
      return res
        .status(400)
        .json({ message: 'The appointment was not created' });
    }

    return res.status(201).json({
      message: 'The appointment was created successfully',
      newAppointment,
    });
  }
}
