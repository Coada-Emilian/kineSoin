/**
 * @description Updates an existing medic record for the authenticated admin,
 *              applying validated changes while preserving existing values for
 *              omitted fields.
 *
 * Rationale:
 * - Ensures only verified administrators can modify medic records, protecting
 *   system integrity and preventing unauthorized updates.
 * - Keeps the controller focused on validation, partial‑update merging, and
 *   predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both admin and medic IDs before performing any write operation.
 * - Supports partial updates by merging incoming fields with existing data,
 *   including normalized phone metadata.
 * - Returns clear, consistent HTTP status codes for invalid input, missing records,
 *   successful updates, and unexpected server errors.
 */

import { Admin, Medic } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';
import updatedMedicSchema from '../../../validations/joi/update/updatedMedicSchema.js';

export default async function updateMedicAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  if (!req.body) {
    return res.status(400).json({
      message:
        'The request body cannot be empty. Please provide the necessary data.',
    });
  }

  try {
    const medic_id = getValidId(req.params.medic_id, 'Medic ID');

    const foundMedic = await Medic.findByPk(medic_id);

    if (!foundMedic) {
      return res.status(404).json({ message: 'Medic not found.' });
    }

    const {
      name,
      surname,
      street_number,
      street_name,
      postal_code,
      city,
      phone_number,
      licence_code,
      email,
      prefix,
    } = req.body;

    const newMedic = {
      admin_id: admin_id || foundMedic.admin_id,
      name: name || foundMedic.name,
      surname: surname || foundMedic.surname,
      street_number: street_number || foundMedic.street_number,
      street_name: street_name || foundMedic.street_name,
      postal_code: postal_code || foundMedic.postal_code,
      city: city || foundMedic.city,
      phone_number: phone_number || foundMedic.phone_number,
      licence_code: licence_code || foundMedic.licence_code,
      email: email || foundMedic.email,
      prefix: prefix || foundMedic.prefix,
      full_phone_number: prefix + phone_number || foundMedic.full_phone_number,
    };

    const { error } = updatedMedicSchema.validate(newMedic);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedMedic = await foundMedic.update(newMedic);

    if (!updatedMedic) {
      return res.status(500).json({ message: 'Error while updating medic.' });
    }

    return res.status(200).json({
      message: 'Medic updated successfully.',
      updatedMedic,
    });
  } catch (error) {
    console.error('Error updating medic:', error);

    return res.status(500).json({
      message: 'Error updating medic:',
      error: error.message,
    });
  }
}
