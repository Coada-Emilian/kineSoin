import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Patient } from '../../../models/index.js';
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
