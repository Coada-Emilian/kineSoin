export function checkPatientStatus(foundPatient) {
  if (!foundPatient) {
    throw new Error(
      'Invalid email or password. Your account is currently not found. Please try again.'
    );
  }

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
