/**
 * @description Increments the appointment‑quantity for a prescription,
 *              performed by the authenticated therapist.
 *
 * Rationale:
 * - Ensures only validated therapists can adjust treatment‑plan quantities,
 *   preserving the integrity of clinical records and preventing unauthorized changes.
 * - Keeps the controller focused on validation, existence checks, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist and prescription IDs to prevent malformed requests.
 * - Ensures the prescription exists before applying any increment.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Prescription } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

export default async function incrementPrescriptionAppointmentQuantityAsTherapist(
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

      // const appointmentQuantitySchema = Joi.object({
      //   appointment_quantity: Joi.number().integer().required(),
      // });

      // if (!req.body) {
      //   return res.status(400).json({
      //     message:
      //       'The request body cannot be empty. Please provide the necessary data.',
      //   });
      // }
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

      foundPrescription.appointment_quantity += 1;

      await foundPrescription.save();

      return res
        .status(200)
        .json({ message: 'Appointment quantity successfully added' });
    } catch (error) {
      console.error(
        'Error adding to prescription appointment quantity:',
        error
      );
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
