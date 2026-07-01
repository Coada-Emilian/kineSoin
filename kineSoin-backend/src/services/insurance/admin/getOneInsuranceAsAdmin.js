import { Admin, Insurance } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getOneInsuranceAsAdmin({ adminId, insuranceId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const insurance_id = getValidId(insuranceId, 'Insurance ID');

  const foundInsurance = await Insurance.findByPk(insurance_id, {
    attributes: [
      'id',
      'name',
      'amc_code',
      'street_number',
      'street_name',
      'postal_code',
      'city',
      'phone_number',
      'prefix',
      'full_phone_number',
    ],
  });

  const sentInsurance = {
    id: foundInsurance.id,
    name: foundInsurance.name,
    amc_code: foundInsurance.amc_code,
    street_number: foundInsurance.street_number,
    street_name: foundInsurance.street_name,
    postal_code: foundInsurance.postal_code,
    city: foundInsurance.city,
    address: `${foundInsurance.street_number} ${foundInsurance.street_name}, ${foundInsurance.postal_code} ${foundInsurance.city}`,
    phone_number: foundInsurance.phone_number,
    prefix: foundInsurance.prefix,
    full_phone_number: `${foundInsurance.prefix}${foundInsurance.phone_number}`,
  };

  return sentInsurance;
}
