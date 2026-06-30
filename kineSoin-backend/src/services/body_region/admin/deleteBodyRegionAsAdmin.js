import { Admin, Body_region } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteBodyRegionAsAdmin({
  adminId,
  bodyRegionId,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const body_region_id = getValidId(bodyRegionId, 'Medic ID');

  const foundBodyRegion = await findOrThrow(
    Body_region,
    body_region_id,
    'Body_region'
  );

  await foundBodyRegion.destroy();
}
