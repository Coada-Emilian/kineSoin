import { Patient } from '../models/index.js';

export async function checkPatientStatus(patientId) {
  const foundPatient = await Patient.findByPk(patientId);
  if (
    !foundPatient ||
    foundPatient.status === 'banned' ||
    foundPatient.status === 'pending' ||
    foundPatient.status === 'inactive'
  ) {
    return false;
  }
  return true;
}
