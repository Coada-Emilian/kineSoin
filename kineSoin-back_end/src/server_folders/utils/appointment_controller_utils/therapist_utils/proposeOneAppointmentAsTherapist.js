/**
 * @description Allows a therapist to propose a new appointment for a patient.
 *
 * Validations and steps:
 * - Therapist ID is hardcoded here (should be dynamic in production).
 * - Validates the therapist ID.
 * - Validates the request body to ensure it contains a valid date, time, patientId, and prescriptionId.
 * - Checks that the prescription ID and patient ID are valid numbers.
 * - Checks if an appointment already exists at the requested date and time.
 * - If no conflicting appointment exists, creates a new appointment with:
 *   - is_canceled set to false
 *   - is_accepted set to false (proposed state)
 * - Returns appropriate error messages for invalid input or if appointment already exists.
 * - Returns success message and appointment details when created.
 *
 * @param {object} req - Express request object containing therapist_id, prescription_id, patient_id, date, and time
 * @param {object} res - Express response object for sending JSON responses
 *
 * @returns {object} JSON with success or error message and appointment data if created
 */

import { Appointment } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function proposeOneAppointmentAsTherapist(req, res) {
  // const therapistId = parseInt(req.body.therapist_id, 10);

  // const prescriptionId = parseInt(req.body.prescription_id, 10);

  // const patientId = parseInt(req.patient_id, 10);

  const therapist_id = 1;

  checkIsValidNumber(therapist_id);

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

  checkIsValidNumber(prescription_id);

  checkIsValidNumber(patient_id);

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
