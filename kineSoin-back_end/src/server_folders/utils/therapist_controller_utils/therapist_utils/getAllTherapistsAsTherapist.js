import { Therapist } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getAllTherapistsAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    checkIsValidNumber(therapist_id);

    try {
      const response = await Therapist.findAll({
        where: { status: 'active' },
        attributes: ['id', 'name', 'surname', 'picture_url'],
      });

      if (!response || response.length === 0) {
        return res.status(404).json({ message: 'No therapists found' });
      } else {
        return res.status(200).json(response);
      }
    } catch (error) {
      console.error('Error retrieving therapists:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
