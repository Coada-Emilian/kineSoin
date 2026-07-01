export function validatePatientStatusChangeAsAdmin(id: number, status: string) {
  if (!id || !status) {
    throw new Error('Missing required fields');
  } else if (
    status !== 'active' &&
    status !== 'inactive' &&
    status !== 'pending' &&
    status !== 'banned'
  ) {
    throw new Error('Invalid status');
  }
  return true;
}
