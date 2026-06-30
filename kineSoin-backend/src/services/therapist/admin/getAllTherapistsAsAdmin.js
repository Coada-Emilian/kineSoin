/**
 * @description Retrieves all therapists for the authenticated admin, returning
 *              a normalized, ordered list with essential identity and status
 *              information.
 *
 * Rationale:
 * - Ensures only verified admins can access the full therapist directory,
 *   protecting system integrity and preventing unauthorized data exposure.
 * - Keeps the controller focused on validation, structured querying, and
 *   predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the admin ID before performing any read operation.
 * - Returns therapists ordered by status and name for clearer administrative review.
 * - Normalizes each therapist entry with a computed `fullName` field.
 * - Provides consistent HTTP status codes for empty results, successful retrieval,
 *   and unexpected server errors.
 */

import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllTherapistsAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const foundTherapists = await Therapist.findAll({
      attributes: ['id', 'name', 'surname', 'status'],
      order: [
        ['status', 'ASC'],
        ['name', 'ASC'],
      ],
    });

    if (foundTherapists.length === 0) {
      return res.status(400).json({ message: 'No therapists found' });
    }

    const allTherapists = [];

    for (const therapist of foundTherapists) {
      const newTherapist = {
        id: therapist.id,
        fullName: `${therapist.name} ${therapist.surname}`,
        status: therapist.status,
      };
      allTherapists.push(newTherapist);
    }

    return res.status(200).json(allTherapists);
  } catch (error) {
    console.error('Error fetching therapists:', error);

    return res.status(500).json({
      message: 'Error fetching therapists.',
      error: error.message,
    });
  }
}
