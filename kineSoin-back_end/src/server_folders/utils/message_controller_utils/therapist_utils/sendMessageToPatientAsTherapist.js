import Joi from 'joi';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Therapist_message } from '../../../models/index.js';

export default async function sendMessageToPatientAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  const patient_id = parseInt(req.params.patient_id, 10);

  if (!therapist_id || !patient_id) {
    return res.status(400).json({ message: 'Therapist or patient not found' });
  } else {
    try {
      checkIsValidNumber(therapist_id);

      checkIsValidNumber(patient_id);

      const sentContentSchema = Joi.string().min(1).max(255).required();

      if (!req.body) {
        return res.status(400).json({
          message: 'Please provide the content of the message',
        });
      } else {
        const { error } = sentContentSchema.validate(req.body.content);

        if (error) {
          return res.status(400).json({ message: error.message });
        } else {
          const newMessage = await Therapist_message.create({
            receiver_id: patient_id,
            sender_id: therapist_id,
            content: req.body.content,
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
