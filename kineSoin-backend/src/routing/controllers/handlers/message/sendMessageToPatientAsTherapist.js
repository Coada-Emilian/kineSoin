import sendMessageToPatientService from '../../../../services/message/therapist/sendMessageToPatientAsTherapist.js';
import createdMessageSchema from '../../../../validations/joi/creation/createdMessageSchema.js';

export default async function sendMessageToPatientAsTherapist(req, res) {
  const { error } = createdMessageSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  const sentMessage = await sendMessageToPatientService({
    therapistId: req.therapist_id,
    patientId: req.params.patient_id,
    messageData: req.body,
  });

  if (!sentMessage) {
    const err = new Error('Error while sending message.');
    err.statusCode = 500;
    throw err;
  }

  return res.status(201).json({ message: 'Message sent successfully' });
}
