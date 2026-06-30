import { Admin, Affliction } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllAfflictionsAsAdmin({ adminId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const foundAfflictions = await Affliction.findAll({
    attributes: [
      'id',
      'name',
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

  return foundAfflictions;
}
