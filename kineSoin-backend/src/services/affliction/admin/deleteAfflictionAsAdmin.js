import { Admin, Affliction } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteAfflictionAsAdmin({
  adminId,
  afflictionId,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const affliction_id = getValidId(afflictionId, 'Affliction ID');

  const foundAffliction = await findOrThrow(
    Affliction,
    affliction_id,
    'Affliction'
  );

  await foundAffliction.destroy();
}
