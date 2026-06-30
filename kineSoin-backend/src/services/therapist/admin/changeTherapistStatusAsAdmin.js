/**
 * @description Updates the status of a therapist from the admin panel, validating
 *              both the admin identity and the incoming status change before
 *              applying the update.
 *
 * Rationale:
 * - Ensures only verified admins can modify therapist accounts, protecting system
 *   integrity and preventing unauthorized administrative actions.
 * - Keeps the controller focused on validation, structured input handling, and
 *   predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates admin and therapist IDs before performing any write operation.
 * - Accepts only predefined status values (`active`, `inactive`) through a Joi schema.
 * - Confirms the therapist exists before applying updates.
 * - Returns consistent HTTP status codes for validation errors, missing records,
 *   successful updates, and unexpected server issues.
 */

import Joi from 'joi';
import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function changeTherapistStatusAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

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

    return res.status(500).json({
      message: 'Error changing therapist status:',
      error: error.message,
    });
  }
}
