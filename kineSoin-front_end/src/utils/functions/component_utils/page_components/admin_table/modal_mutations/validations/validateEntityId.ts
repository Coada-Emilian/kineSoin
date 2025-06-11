export function validateEntityId(id: number) {
  if (!id) {
    throw new Error('ID is required for deletion');
  } else if (isNaN(id)) {
    throw new Error('ID must be a valid number');
  }
  return true;
}
