/**
 * @module authentificationController
 * @description
 * Centralized authentication controller registry for all user roles in the system.
 *
 * This module:
 * - Loads environment variables using `dotenv/config`.
 * - Aggregates authentication-related controller functions for admin, patient, and therapist.
 * - Provides a single structured export for authentication routing and logic handling.
 *
 * Included functionalities:
 *
 * Patient Authentication:
 * - loginPatient: Authenticates a patient and returns login session/token data.
 * - checkPatientPassword: Validates a patient's password without full login (e.g. pre-check or verification step).
 *
 * Therapist Authentication:
 * - loginTherapist: Authenticates a therapist and returns login session/token data.
 *
 * Admin Authentication:
 * - loginAdmin: Authenticates an admin user and returns login session/token data.
 *
 * Behavior:
 * - Acts as a centralized entry point for authentication operations.
 * - Separates authentication logic by user role (admin, patient, therapist).
 * - Improves maintainability and modular structure of authentication flows.
 *
 * Security considerations:
 * - Relies on environment variables for sensitive configuration (`dotenv/config`).
 * - Delegates authentication logic to specialized utility functions per user type.
 *
 * @exports {Object} authentificationController - Collection of authentication controller functions.
 */

import 'dotenv/config';
import loginAdmin from '../../utils/authentification_controller_utils/admin_utils/loginAdmin.js';
import checkPatientPassword from '../../utils/authentification_controller_utils/patient_utils/checkPAtientPassword.js';
import loginPatient from '../../utils/authentification_controller_utils/patient_utils/loginPatient.js';
import loginTherapist from '../../utils/authentification_controller_utils/therapist_utils/loginTherapist.js';

const authentificationController = {
  // Function to login patient
  loginPatient,

  // Function to login therapist
  loginTherapist,

  // Function to login admin
  loginAdmin,

  // Function to check patient password
  checkPatientPassword,
};

export default authentificationController;
