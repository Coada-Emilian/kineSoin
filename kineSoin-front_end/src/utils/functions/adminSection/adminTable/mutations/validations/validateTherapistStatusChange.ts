export function validateTherapistStatusChange(id: number, status: string) {
  if (!id || !status) {
    throw new Error('Missing required fields');
  } else if (status !== 'active' && status !== 'inactive') {
    throw new Error('Invalid status');
  }
  return true;
}
