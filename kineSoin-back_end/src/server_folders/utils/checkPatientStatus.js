// Purpose: check if the patient status is banned, pending, or inactive.

export function checkPatientStatus(foundPatient) {
  // If the patient is not found, throw an error.
  if (!foundPatient) {
    throw new Error(
      'Invalid email or password. Your account is currently not found. Please try again.'
    );
  }

  // If the patient status is banned, pending, or inactive, throw an error.
  const statusMessages = {
    banned: 'Your account is currently banned. Please contact support.',
    pending: 'Your account is currently pending. Please check back later.',
    inactive:
      'Your account is currently inactive. Please reactivate your account.',
  };

  if (statusMessages[foundPatient.status]) {
    throw new Error(
      `Invalid email or password. ${statusMessages[foundPatient.status]}`
    );
  }

  return true;
}
