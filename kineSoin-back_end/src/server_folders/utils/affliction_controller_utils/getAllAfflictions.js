import { checkIsValidNumber } from '../../middlewares/checkIsValidNumber.js';
import { Affliction } from '../../models/index.js';

export default async function getAllAfflictions(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const foundAfflictions = await Affliction.findAll({
        attributes: [
          'id',
          'name',
          'description',
          'insurance_code',
          'is_operated',
          'body_region_id',
        ],
        order: [
          ['body_region_id', 'ASC'],
          ['name', 'ASC'],
        ],
        include: [
          {
            association: 'body_region',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!foundAfflictions) {
        return res.status(404).json({ message: 'No afflictions found.' });
      } else {
        return res.status(200).json(foundAfflictions);
      }
    } catch (error) {
      console.error('Error fetching afflictions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
