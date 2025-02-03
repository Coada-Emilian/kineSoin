// Purpose: Define the message controller, which contains the methods for getting all messages and sending a message to the therapist.

import Joi from 'joi';
import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import { Patient, Patient_message } from '../../models/associations.js';

const messageController = {
  // Get all messages
  getAllMessages: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsIdNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId, {
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

    checkPatientStatus(foundPatient);

    if (
      !foundPatient.sent_messages.length &&
      !foundPatient.received_messages.length
    ) {
      return res.status(200).json({ sentMessages: [], receivedMessages: [] });
    } else {
      const sentMessages = foundPatient.sent_messages;

      const receivedMessages = foundPatient.received_messages;

      res.status(200).json({ sentMessages, receivedMessages });
    }
  },

  // Send a message to the therapist
  sendMessageToTherapist: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);

    checkIsIdNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId);

    if (!foundPatient) {
      return res.status(400).json({ message: 'Patient not found' });
    }
    checkPatientStatus(foundPatient);

    const receiverId = foundPatient.therapist_id;

    checkIsIdNumber(receiverId);

    const messageSchema = Joi.object({
      content: Joi.string().required(),
    });

    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }

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
  },
};

export default messageController;
