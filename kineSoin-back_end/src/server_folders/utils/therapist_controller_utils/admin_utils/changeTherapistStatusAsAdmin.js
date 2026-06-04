/**
 * @function changeTherapistStatusAsAdmin
 * @description
 * Handles updating the status of a therapist from the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the therapist ID from request parameters.
 * - Defines and applies a Joi schema to validate the incoming status value.
 * - Ensures request body is provided and contains valid data.
 * - Retrieves the therapist from the database.
 * - Updates the therapist's status field (e.g., active or inactive).
 *
 * Behavior:
 * - Only allows status updates to predefined values: "active" or "inactive".
 * - Ensures therapist exists before applying updates.
 *
 * Error handling:
 * - Returns 400 if admin ID or therapist ID is invalid.
 * - Returns 400 if request body is missing or invalid.
 * - Returns 400 if validation fails.
 * - Returns 400 if therapist is not found.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.therapist_id` {string|number} Therapist ID to update.
 *   - `req.body` {Object} Request body containing `status`.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response confirming status update or describing errors.
 *
 * @sideEffects
 * - Updates therapist status in the database.
 */

import Joi from 'joi';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Therapist } from '../../../models/index.js';

export default async function changeTherapistStatusAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const therapist_id = getValidId(req.params.therapist_id, 'Therapist ID');

      const updatedTherapistStatusSchema = Joi.object({
        status: Joi.string().valid('active', 'inactive'),
      });

      if (!req.body) {
        return res.status(400).json({
          message: 'Please provide the status to update the therapist',
        });
      } else {
        const { error } = updatedTherapistStatusSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const { status } = req.body;

        const foundTherapist = await Therapist.findByPk(therapist_id);

        if (!foundTherapist) {
          return res.status(400).json({ message: 'Therapist not found' });
        } else {
          await foundTherapist.update({ status });
        }

        return res
          .status(200)
          .json({ message: 'Therapist status updated successfully!' });
      }
    } catch (error) {
      console.error('Error changing therapist status:', error);
    }
  }
}
