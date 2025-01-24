// Purpose: check if the id is a number.

export function checkIsIdNumber(id) {
  if (isNaN(id)) {
    return false;
  } else {
    return true;
  }
}
