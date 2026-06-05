/**
 * @function getAllBodyRegionsAsAdmin
 * @description
 * Retrieves all body region records for the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Fetches all body regions from the database using `Body_region.findAll`.
 * - Selects only required attributes (id and name).
 * - Orders results alphabetically by name.
 * - Formats the result before sending the response.
 *
 * Behavior:
 * - Ensures only authenticated admin requests are processed.
 * - Returns a simplified list of body regions for frontend consumption.
 * - Always returns data in a consistent shape (array of objects).
 *
 * Error handling:
 * - Returns 400 if admin ID is missing or invalid.
 * - Returns 404 if no body regions are found.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Array of body regions `{ id, name }`
 *   - 400: Missing/invalid admin ID error
 *   - 404: No body regions found
 *   - 500: Internal server error
 *
 * @sideEffects
 * - None (read-only database operation).
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Body_region } from '../../../models/index.js';

export default async function getAllBodyRegionsAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const foundBodyRegions = await Body_region.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
      });

      if (!foundBodyRegions) {
        return res.status(404).json({ message: 'No body regions found.' });
      } else {
        const BodyRegionsData = foundBodyRegions.map((bodyRegion) => ({
          id: bodyRegion.id,
          name: bodyRegion.name,
        }));

        return res.status(200).json(BodyRegionsData);
      }
    } catch (error) {
      console.error('Error fetching body regions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
