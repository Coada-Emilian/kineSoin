/**
 * @description Updates an existing insurance organization associated with an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before modifying data.
 * - Validates the insurance identifier.
 * - Retrieves the existing insurance organization.
 * - Applies provided changes while preserving existing values.
 * - Updates generated fields such as the full phone number.
 * - Persists the updated insurance organization.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Insurance } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function updateInsuranceAsAdmin({
  adminId,
  insuranceId,
  insuranceData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const insurance_id = getValidId(insuranceId, 'Insurance ID');

  const {
    name,
    amc_code,
    street_number,
    street_name,
    postal_code,
    city,
    prefix,
    phone_number,
  } = insuranceData;

  const foundInsurance = await findOrThrow(
    Insurance,
    insurance_id,
    'Insurance'
  );

  const sentInsurance = {
    admin_id,
    name: name ?? foundInsurance.name,
    amc_code: amc_code ?? foundInsurance.amc_code,
    street_number: street_number || foundInsurance.street_number,
    street_name: street_name ?? foundInsurance.street_name,
    postal_code: postal_code ?? foundInsurance.postal_code,
    city: city ?? foundInsurance.city,
    phone_number: phone_number ?? foundInsurance.phone_number,
    prefix: prefix ?? foundInsurance.prefix,
    full_phone_number: `${prefix && phone_number ? prefix + phone_number : foundInsurance.full_phone_number}`,
  };

  const updatedInsurance = await foundInsurance.update(sentInsurance);

  return updatedInsurance;
}
