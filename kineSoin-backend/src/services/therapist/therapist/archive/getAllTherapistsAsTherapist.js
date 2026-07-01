/**
 * @description Retrieves all active therapists for the authenticated therapist,
 *              returning a minimal, sanitized list of publicly visible profile
 *              information.
 *
 * Rationale:
 * - Ensures only verified therapists can access the directory of active colleagues,
 *   supporting collaboration while maintaining strict access boundaries.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the therapist ID before performing any read operation.
 * - Returns only therapists with `status: 'active'` to avoid exposing inactive or
 *   restricted accounts.
 * - Provides essential identity and profile‑image fields without exposing sensitive
 *   data.
 * - Returns consistent HTTP status codes for missing records, successful retrieval,
 *   and unexpected server errors.
 */

import { Therapist } from '../../../../models/index.js';

export default async function getAllTherapistsAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      const response = await Therapist.findAll({
        where: { status: 'active' },
        attributes: ['id', 'name', 'surname', 'picture_url'],
      });

      if (!response || response.length === 0) {
        return res.status(404).json({ message: 'No therapists found' });
      } else {
        return res.status(200).json(response);
      }
    } catch (error) {
      console.error('Error retrieving therapists:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
