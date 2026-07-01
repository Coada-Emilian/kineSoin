/**
 * @description Retrieves the authenticated therapist’s own profile data, returning
 *              a sanitized set of public and professional fields for use inside the
 *              therapist dashboard.
 *
 * Rationale:
 * - Ensures therapists can securely access their own profile information without
 *   exposing sensitive or internal fields.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the therapist ID before performing any read operation.
 * - Returns only active therapists, preventing access for inactive or restricted
 *   accounts.
 * - Provides essential identity, qualification, and profile‑image fields suitable
 *   for authenticated display.
 * - Returns consistent HTTP status codes for missing records, successful retrieval,
 *   and unexpected server errors.
 */

import { Therapist } from '../../../../models/index.js';

export default async function getConnectedTherapistData(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      const foundTherapist = await Therapist.findByPk(therapist_id, {
        where: { status: 'active' },
        attributes: [
          'id',
          'name',
          'surname',
          'picture_url',
          'description',
          'diploma',
          'experience',
          'specialty',
          'email',
        ],
      });

      if (!foundTherapist) {
        return res.status(400).json({ message: 'Therapist not found' });
      } else {
        const sentTherapist = {
          ...foundTherapist,
        };

        res.status(200).json(sentTherapist);
      }
    } catch (error) {
      console.error('Error fetching therapist data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
