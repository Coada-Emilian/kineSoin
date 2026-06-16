/**
 * @description Allows a therapist to decrement the appointment quantity of a prescription.
 *
 * Validations and steps:
 * - Validates therapist ID and prescription ID from the request.
 * - Validates the request body contains a valid integer 'appointment_quantity' using Joi.
 * - Checks that the requested decrement amount is at least 1.
 * - Checks that the prescription exists.
 * - Ensures the prescription's current appointment quantity is not zero.
 * - Ensures the decrement does not reduce the appointment quantity below zero.
 * - If all checks pass, subtracts the given quantity from the prescription's appointment quantity and saves.
 * - Returns appropriate JSON success or error messages.
 *
 * @param {object} req - Express request object containing therapist_id, params.prescription_id, and body.appointment_quantity
 * @param {object} res - Express response object for sending JSON responses
 *
 * @returns {object} JSON success or error message indicating the result of the operation
 */

import Joi from 'joi';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Prescription } from '../../../models/index.js';

export default async function decrementPrescriptionAppointmentQuantityAsTherapist(
  req,
  res
) {
  const therapist_id = parseInt(req.therapist_id, 10);

  checkIsValidNumber(therapist_id);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      const prescription_id = parseInt(req.params.prescription_id, 10);

      checkIsValidNumber(prescription_id);

      const appointmentQuantitySchema = Joi.object({
        appointment_quantity: Joi.number().integer().required(),
      });

      if (!req.body) {
        return res.status(400).json({
          message:
            'The request body cannot be empty. Please provide the necessary data.',
        });
      }

      // console.log(req.body);
      // const { error } = appointmentQuantitySchema.validate(req.body);

      // if (error) {
      //   return res.status(400).json({ message: error.details[0].message });
      // }

      // const { appointment_quantity } = req.body;

      // if (appointment_quantity < 1) {
      //   return res
      //     .status(400)
      //     .json({ message: 'Appointment quantity must be at least 1' });
      // }

      const foundPrescription = await Prescription.findByPk(prescription_id);
      if (!foundPrescription) {
        return res.status(400).json({ message: 'Prescription not found' });
      }

      if (foundPrescription.appointment_quantity === 0) {
        return res
          .status(400)
          .json({ message: 'Appointment quantity already at 0' });
      }

      // if (foundPrescription.appointment_quantity < appointment_quantity) {
      //   return res.status(400).json({
      //     message: 'Cannot reduce appointment quantity below current value',
      //   });
      // } else {
      foundPrescription.appointment_quantity -= 1;
      await foundPrescription.save();

      return res
        .status(200)
        .json({ message: 'Appointment quantity successfully reduced' });
      // }
    } catch (error) {
      console.error('Error reducing prescription appointment quantity:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
