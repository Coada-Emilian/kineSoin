import { Admin, Body_region } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllBodyRegionsAsAdmin({ adminId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const foundBodyRegions = await Body_region.findAll({
    attributes: ['id', 'name'],
    order: [['name', 'ASC']],
  });

  return foundBodyRegions;
}
