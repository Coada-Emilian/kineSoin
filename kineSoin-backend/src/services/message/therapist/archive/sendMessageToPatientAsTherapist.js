/**
 * @description Sends a message from the authenticated therapist to a specific patient,
 *              ensuring both sender and receiver IDs are valid and the message content
 *              meets schema requirements.
 *
 * Rationale:
 * - Ensures only verified therapists can initiate communication with patients,
 *   protecting privacy and maintaining secure messaging workflows.
 * - Keeps the controller focused on validation, structured payload creation, and
 *   predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist and patient IDs before performing any write operation.
 * - Requires message content and automatically timestamps each message with date and time.
 * - Returns clear, consistent HTTP status codes for invalid input, missing records,
 *   successful sends, and unexpected server errors.
 */

import { Therapist, Therapist_message } from '../../../../models/index.js';
import { findOrThrow } from '../../../../utils/findOrThrow.js';
import { getValidId } from '../../../../utils/getValidId.js';
import createdMessageSchema from '../../../../validations/joi/creation/createdMessageSchema.js';

export default async function sendMessageToPatientAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Please provide the content of the message',
      });
    }
    const messageContent = req.body.content;

    const { error } = createdMessageSchema.validate(messageContent);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const patient_id = getValidId(req.params.patient_id, 'Patient ID');

    const newMessage = await Therapist_message.create({
      receiver_id: patient_id,
      sender_id: therapist_id,
      content: messageContent,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toISOString().split('T')[1].split('.')[0],
    });

    if (newMessage) {
      return res.status(201).json({ message: 'Message sent successfully' });
    } else {
      return res.status(400).json({ message: 'Message not sent' });
    }
  } catch (error) {
    console.error('Error sending message to patient:', error);

    return res.status(500).json({
      message: 'Error sending message to patient:',
      error: error.message,
    });
  }
}
