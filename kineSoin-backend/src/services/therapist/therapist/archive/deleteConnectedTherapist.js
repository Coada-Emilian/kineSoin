/**
 * @description Deletes the currently authenticated therapist’s account, ensuring
 *              the therapist identity is valid before performing the destructive
 *              action.
 *
 * Rationale:
 * - Allows therapists to remove their own accounts while preventing unauthorized
 *   deletions by validating the authenticated therapist ID.
 * - Keeps the controller focused on simple validation, predictable responses, and
 *   secure record removal while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the therapist ID before performing any write operation.
 * - Uses a direct `destroy` query to remove the therapist record.
 * - Returns consistent HTTP status codes for missing records, successful deletions,
 *   and unexpected server errors.
 */


import { Therapist } from '../../../../models/index.js';

export default async function deleteConnectedTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      const response = await Therapist.destroy({ where: { id: therapist_id } });

      if (!response) {
        return res.status(400).json({ message: 'Therapist not found' });
      } else {
        return res
          .status(200)
          .json({ message: 'Therapist deleted successfully!' });
      }
    } catch (error) {
      console.error('Error deleting therapist:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
