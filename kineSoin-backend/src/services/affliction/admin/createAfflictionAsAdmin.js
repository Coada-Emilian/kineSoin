import { Admin, Affliction } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';
import createdAfflictionSchema from '../../../validations/joi/creation/createdAfflictionSchema.js';

export default async function createAfflictionAsAdmin({
  adminId,
  afflictionData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const { error } = createdAfflictionSchema.validate(afflictionData);

  if (error) {
    throw new Error(error.message);
  }

  const newAffliction = {
    admin_id,
    ...afflictionData,
  };
  
  return await Affliction.create(newAffliction);
}
