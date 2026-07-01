import { Admin, Insurance } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteInsuranceAsAdmin({ adminId, insuranceId }) {
  const admin_id = getValidId(adminId, 'Admin ID');
  await findOrThrow(Admin, admin_id, 'Admin');

  const insurance_id = getValidId(insuranceId, 'Insurance ID');

  const foundInsurance = await findOrThrow(
    Insurance,
    insurance_id,
    'Insurance'
  );

  await foundInsurance.destroy();
}
