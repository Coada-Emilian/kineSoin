/**
 * @description Central controller export for therapist‑to‑patient messaging.
 *
 * Rationale:
 * - Provides a single, predictable entry point for message‑related operations,
 *   keeping routing clean and preventing scattered imports across the codebase.
 * - Focuses on therapist‑initiated communication while keeping unused or
 *   future patient‑side handlers clearly separated.
 *
 * Notes:
 * - Delegates actual messaging logic to dedicated service modules, keeping this
 *   controller lightweight and easy to extend as the messaging system evolves.
 */

import sendMessageToPatientAsTherapist from '../../services/message/therapist/sendMessageToPatientAsTherapist.js';

const messageController = {
  // Function to send a message to the patient as the therapist
  sendMessageToPatientAsTherapist,

  // unused functions

  // // Function to get all messages for a patient
  // getAllMessagesAsPatient,

  // // Function to send a message to the therapist
  // sendMessageToTherapist,
};

export default messageController;
