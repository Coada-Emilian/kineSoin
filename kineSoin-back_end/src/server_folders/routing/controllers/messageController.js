// Purpose: Define the message controller, which contains the methods for getting all messages and sending a message to the therapist.

import getAllMessagesAsPatient from '../../utils/message_controller_utils/patient_utils/getAllMesagesAsPatient.js';
import sendMessageToTherapist from '../../utils/message_controller_utils/patient_utils/sendMessageToTherapist.js';

const messageController = {
  // Function to get all messages for a patient
  getAllMessagesAsPatient,

  // Function to send a message to the therapist
  sendMessageToTherapist,
};

export default messageController;
