import { Admin, Affliction } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';


export default async function updateAfflictionAsAdmin({
  adminId,
  afflictionId,
  afflictionData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const affliction_id = getValidId(afflictionId, 'Affliction ID');

  const foundAffliction = await Affliction.findByPk(affliction_id);

  const { body_region_id, name, description, insurance_code, is_operated } =
    afflictionData;

  const newAffliction = {
    body_region_id: body_region_id || foundAffliction.body_region_id,
    name: name || foundAffliction.name,
    description: description || foundAffliction.description,
    insurance_code: insurance_code || foundAffliction.insurance_code,
    is_operated: is_operated || foundAffliction.is_operated,
    admin_id,
  };



  const updatedAffliction = await foundAffliction.update(newAffliction);

  return updatedAffliction;
}
