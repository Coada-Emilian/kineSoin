/**
 * @description Retrieves all sent and received messages for the authenticated patient,
 *              ensuring the patient is valid and active before exposing message data.
 *
 * Rationale:
 * - Ensures only verified and active patients can access their messaging history,
 *   protecting privacy and preventing unauthorized reads.
 * - Keeps the controller focused on validation, status checks, and predictable
 *   response formatting while delegating relational querying to Sequelize models.
 *
 * Notes:
 * - Validates the patient ID and confirms the patient exists before performing any read.
 * - Enforces patient‑status rules to block access for inactive or restricted accounts.
 * - Returns a structured payload separating `sentMessages` and `receivedMessages`,
 *   each enriched with sender/receiver metadata for frontend display.
 * - Provides clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Patient } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { checkPatientStatus } from '../../checkPatientStatus.js';

export default async function getAllMessagesAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const foundPatient = await Patient.findByPk(patient_id, {
        attributes: ['id', 'name', 'surname', 'status'],
        include: [
          {
            association: 'sent_messages',
            attributes: ['id', 'content', 'date', 'time'],
            include: [
              {
                association: 'sender',
                attributes: ['name', 'surname', 'picture_url', 'therapist_id'],
              },
              {
                association: 'receiver',
                attributes: ['name', 'surname', 'picture_url'],
              },
            ],
          },
          {
            association: 'received_messages',
            include: [
              {
                association: 'sender',
                attributes: ['name', 'surname', 'picture_url'],
              },
              {
                association: 'receiver',
                attributes: ['name', 'surname', 'picture_url'],
              },
            ],
          },
        ],
      });

      if (!foundPatient) {
        return res.status(400).json({ message: 'Patient not found' });
      } else {
        checkPatientStatus(foundPatient);

        const sentMessages = foundPatient.sent_messages || [];
        const receivedMessages = foundPatient.received_messages || [];

        return res.status(200).json({ sentMessages, receivedMessages });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
