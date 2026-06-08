/**
 * @function sendMessageToPatientAsTherapist
 * @description
 * Sends a message from an authenticated therapist to a specific patient.
 *
 * This controller:
 * - Validates the therapist ID using `getValidId`.
 * - Validates the patient ID from request parameters.
 * - Ensures the request body is provided.
 * - Extracts the message content from the request body.
 * - Validates the message content using Joi schema (`createdMessageSchema`).
 * - Creates a new therapist message record in the database.
 * - Automatically assigns the current date and time to the message.
 *
 * Behavior:
 * - Ensures only authenticated therapists can send messages.
 * - Associates the message with both the sender (therapist) and receiver (patient).
 * - Stores the message timestamp using the current server date and time.
 * - Returns a confirmation message when the message is successfully sent.
 *
 * Error handling:
 * - Returns 400 if the therapist ID or patient ID is invalid.
 * - Returns 400 if the request body is missing.
 * - Returns 400 if message content validation fails.
 * - Returns 400 if message creation fails.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.therapist_id` {number} Therapist ID injected by authentication middleware.
 *   - `req.params.patient_id` {string|number} Recipient patient ID.
 *   - `req.body` {Object} Message payload.
 *     - `content` {string} Message content.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 201: Success message indicating the message was sent.
 *   - 400: Validation, missing data, or creation errors.
 *   - 500: Internal server error.
 *
 * Message fields created:
 * - `sender_id` {number} Therapist ID.
 * - `receiver_id` {number} Patient ID.
 * - `content` {string} Message content.
 * - `date` {string} Message creation date (YYYY-MM-DD).
 * - `time` {string} Message creation time (HH:mm:ss).
 *
 * @sideEffects
 * - Creates a new therapist-to-patient message record in the database.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Therapist_message } from '../../../models/index.js';
import createdMessageSchema from '../../joi_validations/creation_validations/createdMessageSchema.js';

export default async function sendMessageToPatientAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  const patient_id = getValidId(req.params.patient_id, 'Patient ID');

  if (!therapist_id || !patient_id) {
    return res.status(400).json({ message: 'Therapist or patient not found' });
  } else {
    try {
      if (!req.body) {
        return res.status(400).json({
          message: 'Please provide the content of the message',
        });
      } else {
        const messageContent = req.body.content;

        const { error } = createdMessageSchema.validate(messageContent);

        if (error) {
          return res.status(400).json({ message: error.message });
        } else {
          const newMessage = await Therapist_message.create({
            receiver_id: patient_id,
            sender_id: therapist_id,
            content: messageContent,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toISOString().split('T')[1].split('.')[0],
          });

          if (newMessage) {
            return res
              .status(201)
              .json({ message: 'Message sent successfully' });
          } else {
            return res.status(400).json({ message: 'Message not sent' });
          }
        }
      }
    } catch (error) {
      console.error('Error sending message to patient:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
