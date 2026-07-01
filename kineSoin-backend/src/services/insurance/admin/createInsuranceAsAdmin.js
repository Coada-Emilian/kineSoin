import { Admin, Insurance } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function createInsuranceAsAdmin({
  adminId,
  insuranceData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const newInsurance = {
    admin_id,
    name: insuranceData.name,
    amc_code: insuranceData.amc_code,
    street_number: insuranceData.street_number,
    street_name: insuranceData.street_name,
    postal_code: insuranceData.postal_code,
    city: insuranceData.city,
    phone_number: insuranceData.phone_number,
    prefix: insuranceData.prefix,
    full_phone_number: `${insuranceData.prefix}${insuranceData.phone_number}`,
  };
  return await Insurance.create(newInsurance);
}
