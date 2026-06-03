import { checkIsValidNumber } from '../middlewares/checkIsValidNumber.js';

export function getValidId(value, label = 'ID') {
  const id = parseInt(value, 10);

  if (!id) {
    throw new Error(`${label} is required`);
  }

  checkIsValidNumber(id);

  return id;
}
