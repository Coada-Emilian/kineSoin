import { Admin, Medic } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteMedicAsAdmin({ adminId, medicId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const medic_id = getValidId(medicId, 'Medic ID');

  const foundMedic = await findOrThrow(Medic, medic_id, 'Medic');

  await foundMedic.destroy();
}
