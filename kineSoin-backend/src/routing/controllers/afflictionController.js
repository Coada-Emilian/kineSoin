/**
 * @description Central export module for all affliction‑related controllers.
 *
 * Rationale:
 * - Provides a single, predictable entry point for all affliction and body‑region
 *   operations, keeping routing clean and avoiding scattered imports across the app.
 * - Separates admin‑level management logic from patient‑facing read operations,
 *   making the controller surface easier to reason about and maintain.
 *
 * Notes:
 * - Groups related service functions into a cohesive API object, improving modularity
 *   and making future extensions (e.g., patient‑side queries) straightforward.
 */

import createBodyRegionAsAdmin from '../../services/affliction/body_region/createBodyRegionAsAdmin.js';
import deleteBodyRegionAsAdmin from '../../services/affliction/body_region/deleteBodyRegionAsAdmin.js';
import getAllBodyRegionsAsAdmin from '../../services/affliction/body_region/getAllBodyRegionsAsAdmin.js';
import getAllAfflictionsAsAdmin from '../../services/affliction/getAllAfflictionsAsAdmin.js';
import getOneAfflictionAsAdmin from '../../services/affliction/getOneAfflictionAsAdmin.js';
import updateAfflictionAsAdmin from '../../services/affliction/updateAfflictionAsAdmin.js';
import createAfflictionAsAdmin from './handlers/affliction/createAfflictionAsAdmin.js';
import deleteAfflictionAsAdmin from './handlers/affliction/deleteAfflictionAsAdmin.js';

const afflictionController = {
  // Function to get all afflictions as admin
  getAllAfflictionsAsAdmin,

  // Function to get one affliction as admin
  getOneAfflictionAsAdmin,

  // Function to create a new affliction as admin
  createAfflictionAsAdmin,

  // Function to update an affliction as admin
  updateAfflictionAsAdmin,

  // Function to delete an affliction as admin
  deleteAfflictionAsAdmin,

  // Function to get all body regions as admin
  getAllBodyRegionsAsAdmin,

  // Function to create a new body region as admin
  createBodyRegionAsAdmin,

  // Function to delete one body region as admin
  deleteBodyRegionAsAdmin,

  // // Function to get affliction names as a patient
  // getAfflictionNamesAsPatient,
};

export default afflictionController;
