/**
 * @description Central export hub for all medic‑related controller functions.
 *
 * Rationale:
 * - Provides a single, predictable entry point for all medic management logic,
 *   keeping routing clean and preventing scattered imports across the codebase.
 * - Clearly separates admin‑side CRUD operations from patient‑facing read
 *   functionality, making the controller surface easier to maintain and extend.
 *
 * Notes:
 * - Delegates actual business logic to dedicated service modules, keeping this
 *   controller lightweight and focused on structure rather than implementation.
 */

import createMedicAsAdmin from './handlers/medic/admin/createMedicAsAdmin.js';
import deleteMedicAsAdmin from './handlers/medic/admin/deleteMedicAsAdmin.js';
import getAllMedicsAsAdmin from './handlers/medic/admin/getAllMedicsAsAdmin.js';
import getOneMedicAsAdmin from './handlers/medic/admin/getOneMedicAsAdmin.js';
import updateMedicAsAdmin from './handlers/medic/admin/updateMedicAsAdmin.js';

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

  // // Function to get medic names as patient
  // getMedicNamesAsPatient,
};

export default medicController;
