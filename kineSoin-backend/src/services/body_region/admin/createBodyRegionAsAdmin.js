import { Admin, Body_region } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function createBodyRegionAsAdmin({
  adminId,
  bodyRegionData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const newBodyRegion = {
    admin_id,
    name: bodyRegionData.name,
  };

  return Body_region.create(newBodyRegion);
}
