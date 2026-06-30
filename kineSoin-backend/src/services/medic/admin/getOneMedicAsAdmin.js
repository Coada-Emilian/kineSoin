/**
 * @description Retrieves a single medic for the authenticated admin, returning a
 *              normalized, frontend‑ready structure including full name, address,
 *              and phone metadata.
 *
 * Rationale:
 * - Ensures only verified administrators can access detailed medic records,
 *   protecting system integrity and preventing unauthorized reads.
 * - Keeps the controller focused on validation, lookup, and predictable response
 *   formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both admin and medic IDs before performing any read operation.
 * - Normalizes the medic record into a clean payload (full name, full address,
 *   combined phone number) to simplify frontend consumption.
 * - Returns clear, consistent HTTP status codes for missing records and
 *   unexpected server errors.
 */

import { Admin, Medic } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getOneMedicAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const medic_id = getValidId(req.params.medic_id, 'Patient ID');

    const foundMedic = await Medic.findByPk(medic_id, {
      attributes: [
        'id',
        'name',
        'surname',
        'street_number',
        'street_name',
        'postal_code',
        'city',
        'prefix',
        'phone_number',
        'licence_code',
        'email',
      ],
    });

    if (!foundMedic) {
      return res.status(404).json({ message: 'No medic found.' });
    } else {
      const sentMedic = {
        id: foundMedic.id,
        name: foundMedic.name,
        surname: foundMedic.surname,
        street_number: foundMedic.street_number,
        street_name: foundMedic.street_name,
        postal_code: foundMedic.postal_code,
        city: foundMedic.city,
        full_name: `${foundMedic.name} ${foundMedic.surname}`,
        address: `${foundMedic.street_number} ${foundMedic.street_name}, ${foundMedic.postal_code} ${foundMedic.city}`,
        phone_number: foundMedic.phone_number,
        prefix: foundMedic.prefix,
        full_phone_number: `${foundMedic.prefix}  ${foundMedic.phone_number}`,
        licence_code: foundMedic.licence_code,
        email: foundMedic.email,
      };

      return res.status(200).json(sentMedic);
    }
  } catch (error) {
    console.error('Error fetching medic:', error);

    return res.status(500).json({
      message: 'Error fetching medic:',
      error: error.message,
    });
  }
}
