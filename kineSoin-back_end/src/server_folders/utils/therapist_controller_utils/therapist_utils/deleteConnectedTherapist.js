import { Therapist } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function deleteConnectedTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    checkIsValidNumber(therapist_id);
    try {
      const response = await Therapist.destroy({ where: { id: therapist_id } });

      if (!response) {
        return res.status(400).json({ message: 'Therapist not found' });
      } else {
        return res
          .status(200)
          .json({ message: 'Therapist deleted successfully!' });
      }
    } catch (error) {
      console.error('Error deleting therapist:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
