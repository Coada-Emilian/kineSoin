/**
 * @description Controller for managing afflictions and body regions.
 *
 * This module includes functions for handling CRUD operations for both afflictions and body regions,
 * as well as functions specifically designed for patients to access affliction names.
 *
 * The controller functions are as follows:
 *
 * - `getAllAfflictions(req, res)`:
 *   - Retrieves a list of all afflictions with their attributes and associated body region details.
 *   - Returns a 200 status with data or a 404 status if no afflictions are found.
 *
 * - `getOneAffliction(req, res)`:
 *   - Retrieves a specific affliction by ID.
 *   - Returns a 200 status with affliction data or a 404 status if not found.
 *
 * - `createAffliction(req, res)`:
 *   - Creates a new affliction with provided data, including validation via Joi.
 *   - Returns a 201 status with the created affliction or an error if creation fails.
 *
 * - `updateAffliction(req, res)`:
 *   - Updates an existing affliction with provided data, ensuring validation and partial updates.
 *   - Returns a 200 status if successful or a 400/404 if there are issues.
 *
 * - `deleteAffliction(req, res)`:
 *   - Deletes a specific affliction by ID.
 *   - Returns a 200 status with a success message or an error if deletion fails.
 *
 * - `getAllBodyRegions(req, res)`:
 *   - Retrieves a list of all body regions.
 *   - Returns a 200 status with body region data or a 404 status if no regions are found.
 *
 * - `createBodyRegion(req, res)`:
 *   - Creates a new body region with provided data, including validation via Joi.
 *   - Returns a 201 status with the created body region or an error if creation fails.
 *
 * - `deleteBodyRegion(req, res)`:
 *   - Deletes a specific body region by ID.
 *   - Returns a 200 status with a success message or an error if deletion fails.
 *
 * - `getAfflictionNamesAsPatient(req, res)`:
 *   - Allows patients to fetch a simplified list of affliction names.
 *   - Returns a 200 status with affliction names or a 404 if none are found.
 *
 * @module afflictionController
 * @requires createBodyRegion - Function to create a new body region.
 * @requires deleteBodyRegion - Function to delete a body region by ID.
 * @requires getAllBodyRegions - Function to retrieve all body regions.
 * @requires createAffliction - Function to create a new affliction.
 * @requires deleteAffliction - Function to delete an affliction by ID.
 * @requires getAfflictionNamesAsPatient - Function to fetch affliction names for patients.
 * @requires getAllAfflictions - Function to retrieve all afflictions.
 * @requires getOneAffliction - Function to retrieve a single affliction by ID.
 * @requires updateAffliction - Function to update an existing affliction.
 */

import createBodyRegion from '../../utils/affliction_controller_utils/body_region_utils/createBodyRegion.js';
import deleteBodyRegion from '../../utils/affliction_controller_utils/body_region_utils/deleteBodyRegion.js';
import getAllBodyRegions from '../../utils/affliction_controller_utils/body_region_utils/getAllBodyRegions.js';
import createAffliction from '../../utils/affliction_controller_utils/createAffliction.js';
import deleteAffliction from '../../utils/affliction_controller_utils/deleteAffliction.js';
import getAfflictionNamesAsPatient from '../../utils/affliction_controller_utils/getAfflictionNamesAsPatient.js';
import getAllAfflictions from '../../utils/affliction_controller_utils/getAllAfflictions.js';
import getOneAffliction from '../../utils/affliction_controller_utils/getOneAffliction.js';
import updateAffliction from '../../utils/affliction_controller_utils/updateAffliction.js';

const afflictionController = {
  // Function to get all afflictions
  getAllAfflictions,

  // Function to get one affliction
  getOneAffliction,

  // Function to create a new affliction
  createAffliction,

  // Function to update an affliction
  updateAffliction,

  // Function to delete an affliction
  deleteAffliction,

  // Function to get all body regions
  getAllBodyRegions,

  // Function to create a new body region
  createBodyRegion,

  // Function to delete one body region
  deleteBodyRegion,

  // Function to get affliction names as a patient
  getAfflictionNamesAsPatient,
};

export default afflictionController;
