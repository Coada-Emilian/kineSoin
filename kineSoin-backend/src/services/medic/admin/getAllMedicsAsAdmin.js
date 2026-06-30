/**
 * @description Retrieves all medics for the authenticated admin, returning a
 *              normalized, frontend‑ready list with combined name metadata.
 *
 * Rationale:
 * - Ensures only verified administrators can access medic listings, protecting
 *   system integrity and preventing unauthorized reads.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the admin ID before performing any read operation.
 * - Returns a lightweight dataset containing essential fields, including a
 *   computed `fullName` for cleaner frontend consumption.
 * - Provides clear, consistent HTTP status codes for empty results and unexpected errors.
 */

import { Admin, Medic } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllMedicsAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const foundMedics = await Medic.findAll({
      attributes: ['id', 'name', 'surname', 'licence_code'],
    });

    if (foundMedics.length === 0) {
      return res.status(404).json({ message: 'No medics found.' });
    } else {
      const sentMedics = [];

      for (const medic of foundMedics) {
        const newMedic = {
          id: medic.id,
          fullName: `${medic.name} ${medic.surname}`,
          licence_code: medic.licence_code,
        };

        sentMedics.push(newMedic);
      }
      return res.status(200).json(sentMedics);
    }
  } catch (error) {
    console.error('Error fetching medics:', error);

    return res.status(500).json({
      message: 'Error fetching medics:',
      error: error.message,
    });
  }
}
