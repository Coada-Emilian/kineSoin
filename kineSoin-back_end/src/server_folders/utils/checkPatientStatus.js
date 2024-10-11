export function checkPatientStatus(foundPatient) {
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
