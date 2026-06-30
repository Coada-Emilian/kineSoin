/**
 * @description Updates an existing insurance organism on behalf of the authenticated
 *              admin, applying validated changes while preserving existing values
 *              when fields are omitted.
 *
 * Rationale:
 * - Ensures only verified administrators can modify insurance‑organism records,
 *   protecting system integrity and preventing unauthorized updates.
 * - Keeps the controller focused on validation, lookup, and predictable response
 *   formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both admin and insurance IDs before performing any write operation.
 * - Applies partial updates by merging incoming fields with existing values,
 *   including normalized phone metadata.
 * - Returns clear, consistent HTTP status codes for invalid input, missing records,
 *   successful updates, and unexpected server errors.
 */
 
import { Admin, Insurance } from '../../../models/associations.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';
import updatedInsuranceSchema from '../../../validations/joi/update/updatedInsuranceSchema.js';

export default async function updateInsuranceOrganismAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const insurance_id = getValidId(req.params.insurance_id, 'Insurance ID');

    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    } else {
      const { error } = updatedInsuranceSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.message });
      } else {
        const {
          name,
          amc_code,
          street_number,
          street_name,
          postal_code,
          city,
          prefix,
          phone_number,
        } = req.body;

        const foundInsurance = await Insurance.findByPk(insurance_id);

        if (!foundInsurance) {
          return res.status(400).json({ message: 'Insurance not found' });
        } else {
          const sentInsurance = {
            admin_id,
            name: name || foundInsurance.name,
            amc_code: amc_code || foundInsurance.amc_code,
            street_number: street_number || foundInsurance.street_number,
            street_name: street_name || foundInsurance.street_name,
            postal_code: postal_code || foundInsurance.postal_code,
            city: city || foundInsurance.city,
            phone_number: phone_number || foundInsurance.phone_number,
            prefix: prefix || foundInsurance.prefix,
            full_phone_number: `${prefix && phone_number ? prefix + phone_number : foundInsurance.full_phone_number}`,
          };

          const response = await foundInsurance.update(sentInsurance);

          if (response) {
            return res
              .status(200)
              .json({ message: 'Insurance organism updated', response });
          } else {
            return res
              .status(500)
              .json({ message: 'Error updating insurance organism.' });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error updating insurance:', error);

    return res.status(500).json({
      message: 'Error updating insurance:',
      error: error.message,
    });
  }
}
