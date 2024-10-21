export function checkIsIdNumber(id, res) {
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ message: 'This ID is not valid. Please provide a valid ID.' });
  }
}
