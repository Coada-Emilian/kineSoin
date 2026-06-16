/**
 * @module afflictionController
 * @description
 * Centralized controller registry for all affliction and body region related operations.
 *
 * This module:
 * - Aggregates all affliction-related controller functions into a single exportable object.
 * - Separates admin-level operations from patient-level read operations.
 * - Provides a structured API surface for routing and controller access.
 *
 * Included functionalities:
 *
 * Admin Affliction Management:
 * - getAllAfflictionsAsAdmin: Retrieves all afflictions.
 * - getOneAfflictionAsAdmin: Retrieves a single affliction by ID.
 * - createAfflictionAsAdmin: Creates a new affliction.
 * - updateAfflictionAsAdmin: Updates an existing affliction.
 * - deleteAfflictionAsAdmin: Deletes an affliction.
 *
 * Body Region Management (Admin):
 * - getAllBodyRegionsAsAdmin: Retrieves all body regions.
 * - createBodyRegionAsAdmin: Creates a new body region.
 * - deleteBodyRegionAsAdmin: Deletes a body region.
 *
 * Patient-facing Affliction Data:
 * - getAfflictionNamesAsPatient: Retrieves affliction names for patient usage.
 *
 * Behavior:
 * - Acts as a single entry point for affliction-related controllers.
 * - Improves modularity and maintainability by grouping related logic.
 *
 * @exports {Object} afflictionController - Collection of controller functions.
 */

import createBodyRegionAsAdmin from '../../utils/affliction_controller_utils/body_region_utils/createBodyRegionAsAdmin.js';
import deleteBodyRegionAsAdmin from '../../utils/affliction_controller_utils/body_region_utils/deleteBodyRegionAsAdmin.js';
import getAllBodyRegionsAsAdmin from '../../utils/affliction_controller_utils/body_region_utils/getAllBodyRegionsAsAdmin.js';
import createAfflictionAsAdmin from '../../utils/affliction_controller_utils/createAfflictionAsAdmin.js';
import deleteAfflictionAsAdmin from '../../utils/affliction_controller_utils/deleteAfflictionAsAdmin.js';
import getAfflictionNamesAsPatient from '../../utils/affliction_controller_utils/getAfflictionNamesAsPatient.js';
import getAllAfflictionsAsAdmin from '../../utils/affliction_controller_utils/getAllAfflictionsAsAdmin.js';
import getOneAfflictionAsAdmin from '../../utils/affliction_controller_utils/getOneAfflictionAsAdmin.js';
import updateAfflictionAsAdmin from '../../utils/affliction_controller_utils/updateAfflictionAsAdmin.js';

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

  // Function to get affliction names as a patient
  getAfflictionNamesAsPatient,
};

export default afflictionController;
