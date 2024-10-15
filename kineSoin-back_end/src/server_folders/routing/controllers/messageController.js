import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import computeAge from '../../utils/computeAge.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import {
  Patient,
  Appointment,
  Patient_message,
} from '../../models/associations.js';
import { application } from 'express';
import { parse } from 'dotenv';

const messageController = {
  getAllMessages: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;

    checkIsIdNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId, {
      attributes: ['id', 'name', 'surname', 'status'],
      include: [
        {
          association: 'sent_messages',
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
  sendMessageToTherapist: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;
    checkIsIdNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId);
    checkPatientStatus(foundPatient);

    const receiverId = foundPatient.therapist_id;
    checkIsIdNumber(receiverId);

    const currentDate = new Date();
    const currentTime = currentDate.toTimeString();

    const messageSchema = Joi.object({
      content: Joi.string().required(),
    });

    const { error } = messageSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { content } = req.body;

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
