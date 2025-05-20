import { Therapist } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getConnectedTherapistData(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      checkIsValidNumber(therapist_id);

      const foundTherapist = await Therapist.findByPk(therapist_id, {
        where: { status: 'active' },
        attributes: [
          'id',
          'name',
          'surname',
          'picture_url',
          'description',
          'diploma',
          'experience',
          'specialty',
          'email',
        ],
      });

      if (!foundTherapist) {
        return res.status(400).json({ message: 'Therapist not found' });
      } else {
        const sentTherapist = {
          ...foundTherapist,
        };

        res.status(200).json(sentTherapist);
      }
    } catch (error) {
      console.error('Error fetching therapist data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
