import Joi from 'joi';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Patient, Patient_message } from '../../../models/index.js';
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
