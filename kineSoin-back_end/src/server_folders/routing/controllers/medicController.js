/**
 * @module medicController
 * @description
 * Centralized controller registry for all medic-related operations.
 *
 * This module:
 * - Aggregates all medic-related controller functions into a single exportable object.
 * - Separates admin-level CRUD operations from patient-facing read operations.
 * - Provides a clean and structured interface for routing and controller management.
 *
 * Included functionalities:
 *
 * Admin Medic Management:
 * - getAllMedicsAsAdmin: Retrieves all medics.
 * - getOneMedicAsAdmin: Retrieves a single medic by ID.
 * - createMedicAsAdmin: Creates a new medic record.
 * - updateMedicAsAdmin: Updates an existing medic record.
 * - deleteMedicAsAdmin: Deletes a medic record.
 *
 * Patient-facing Medic Data:
 * - getMedicNamesAsPatient: Retrieves medic names for patient usage.
 *
 * Behavior:
 * - Serves as a centralized entry point for medic-related controller logic.
 * - Improves modularity, maintainability, and separation of concerns.
 * - Groups admin and patient functionalities clearly for better readability.
 *
 * @exports {Object} medicController - Collection of medic controller functions.
 */

import createMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/createMedicAsAdmin.js';
import deleteMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/deleteMedicAsAdmin.js';
import getAllMedicsAsAdmin from '../../utils/medic_controller_utils/admin_utils/getAllMedicsAsAdmin.js';
import getOneMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/getOneMedicAsAdmin.js';
import updateMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/updateMedicAsAdmin.js';
import getMedicNamesAsPatient from '../../utils/medic_controller_utils/patient_utils/getMedicNamesAsPatient.js';

const medicController = {
  // Function to get all medics as admin
  getAllMedicsAsAdmin,

  // Function to get one medic as admin
  getOneMedicAsAdmin,

  // Function to create a medic as admin
  createMedicAsAdmin,

  // Function to update a medic as admin
  updateMedicAsAdmin,

  // Function to delete a medic as admin
  deleteMedicAsAdmin,

  // Function to get medic names as patient
  getMedicNamesAsPatient,
};

export default medicController;
