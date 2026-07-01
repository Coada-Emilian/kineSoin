/**
 * @description Sends a message from the authenticated patient to their assigned
 *              therapist, ensuring the patient is valid, active, and submitting
 *              properly structured content.
 *
 * Rationale:
 * - Ensures only verified and active patients can initiate therapist communication,
 *   protecting privacy and maintaining secure messaging workflows.
 * - Keeps the controller focused on validation, status checks, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the patient ID and confirms the patient exists before performing any write.
 * - Enforces patient‑status rules to block messaging for inactive or restricted accounts.
 * - Requires message content and automatically timestamps each message with date and time.
 * - Returns clear, consistent HTTP status codes for invalid input, missing records,
 *   successful sends, and unexpected server errors.
 */

import Joi from 'joi';
import { Patient, Patient_message } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { checkPatientStatus } from '../../checkPatientStatus.js';

export default async function sendMessageToTherapist(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const foundPatient = await Patient.findByPk(patient_id);

      if (!foundPatient) {
        return res.status(400).json({ message: 'Patient not found' });
      }
      checkPatientStatus(foundPatient);

      const receiver_id = foundPatient.therapist_id;

      checkIsValidNumber(receiver_id);

      const messageSchema = Joi.object({
        content: Joi.string().required(),
      });

      if (!req.body) {
        return res.status(400).json({ message: 'Request body is missing' });
      } else {
        const { error } = messageSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const { content } = req.body;

        const currentDate = new Date();
        const currentTime = currentDate
          .toISOString()
          .split('T')[1]
          .replace('Z', '');

        const sentMessage = await Patient_message.create({
          content,
          date: currentDate,
          time: currentTime,
          sender_id: patientId,
          receiver_id: receiverId,
        });

        res
          .status(201)
          .json({ message: 'Message sent successfully!', sentMessage });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
