import { Therapist } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getAllTherapistsAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const foundTherapists = await Therapist.findAll({
        attributes: ['id', 'name', 'surname', 'status'],
        order: [
          ['status', 'ASC'],
          ['name', 'ASC'],
        ],
      });

      if (!foundTherapists) {
        return res.status(400).json({ message: 'No therapists found' });
      }

      const allTherapists = [];

      for (const therapist of foundTherapists) {
        const newTherapist = {
          id: therapist.id,
          fullName: `${therapist.name} ${therapist.surname}`,
          status: therapist.status,
        };
        allTherapists.push(newTherapist);
      }

      return res.status(200).json(allTherapists);
    } catch (err) {
      console.error('Error fetching therapists:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
