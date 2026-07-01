/**
 * @description Central controller export for therapist‑related admin operations.
 *
 * Rationale:
 * - Provides a single, predictable entry point for all therapist management logic,
 *   keeping routing clean and preventing scattered imports across the codebase.
 * - Clearly separates admin‑side CRUD and status‑management responsibilities from
 *   therapist‑facing features, making the controller surface easier to maintain
 *   and extend as the role evolves.
 *
 * Notes:
 * - Delegates business logic to dedicated service modules, keeping this controller
 *   lightweight and focused on structure rather than implementation.
 */

import changeTherapistStatusAsAdmin from './handlers/therapist/admin/changeTherapistStatusAsAdmin.js';
import createTherapistAsAdmin from './handlers/therapist/admin/createTherapistAsAdmin.js';
import deleteTherapistAsAdmin from './handlers/therapist/admin/deleteTherapistAsAdmin.js';
import getAllTherapistsAsAdmin from './handlers/therapist/admin/getAllTherapistsAsAdmin.js';
import getOneTherapistAsAdmin from './handlers/therapist/admin/getOneTherapistAsAdmin.js';
import toggleTherapistStatusAsAdmin from './handlers/therapist/admin/toggleTherapistStatusAsAdmin.js';
import updateTherapistAsAdmin from './handlers/therapist/admin/updateTherapistAsAdmin.js';

const therapistController = {
  // Function to get all therapists as admin
  getAllTherapistsAsAdmin,

  // Function to get one therapist as admin
  getOneTherapistAsAdmin,

  // Function to update a therapist as admin
  updateTherapistAsAdmin,

  // Function to delete a therapist as admin
  deleteTherapistAsAdmin,

  // Function to create a therapist as admin
  createTherapistAsAdmin,

  // Function to toggle therapist status as admin
  changeTherapistStatusAsAdmin,

  // Function to toggle therapist status as admin
  toggleTherapistStatusAsAdmin,

  // // Get therapist's data
  // getConnectedTherapistData,

  // // Delete therapist
  // deleteConnectedTherapist,

  // // Update therapist's data
  // updateConnectedTherapist,

  // // Upload therapist's photo
  // uploadTherapistPhoto,

  // // Function to get all therapists as therapist
  // getAllTherapistsAsTherapist,

  // // Function to get a patient's personal therapist
  // getPersonalTherapistAsPatient,
};

export default therapistController;
