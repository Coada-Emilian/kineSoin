import {
  Patient,
  Therapist,
  Therapist_message,
} from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function sendMessageToPatientAsTherapist({
  therapistId,
  patientId,
  messageData,
}) {
  const therapist_id = getValidId(therapistId, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  const patient_id = getValidId(patientId, 'Patient ID');

  await findOrThrow(Patient, patient_id, 'Patient');

  const messageContent = messageData.content;

  return await Therapist_message.create({
    receiver_id: patient_id,
    sender_id: therapist_id,
    content: messageContent,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toISOString().split('T')[1].split('.')[0],
  });
}
