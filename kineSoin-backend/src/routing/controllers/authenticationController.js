/**
 * @description Central controller export for authentication operations.
 *
 * Rationale:
 * - Provides a single, predictable entry point for all authentication flows,
 *   keeping routing clean and preventing scattered imports across the codebase.
 * - Separates logic by user role (admin, therapist, patient) to maintain clear
 *   boundaries and simplify future extensions to the auth system.
 *
 * Notes:
 * - Relies on environment‑based configuration for secure handling of credentials.
 * - Delegates actual authentication logic to role‑specific service modules,
 *   keeping this controller lightweight and easy to maintain.
 */

import 'dotenv/config';
import loginAdmin from './handlers/authentication//admin/loginAdmin.js';
import loginTherapist from './handlers/authentication/therapist/loginTherapist.js';

const authenticationController = {
  // Function to login admin
  loginAdmin,

  // Function to login therapist
  loginTherapist,

  //   // Function to check patient password
  //   checkPatientPassword,

  //     // Function to login patient
  //   loginPatient,
};

export default authenticationController;
