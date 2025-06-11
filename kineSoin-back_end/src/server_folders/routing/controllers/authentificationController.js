/**
 * @module authentificationController
 * @description
 * This controller manages all authentication-related operations for the three user roles:
 * - Patients
 * - Therapists
 * - Admins
 *
 * Functions include:
 * - `registerPatient`: Handles registration logic for a new patient.
 * - `loginPatient`: Authenticates a patient and returns a token if successful.
 * - `loginTherapist`: Authenticates a therapist and returns a token if successful.
 * - `loginAdmin`: Authenticates an admin and returns a token if successful.
 * - `checkPatientPassword`: Validates the patient’s password (used for confirmation flows).
 *
 * These utilities ensure secure access control and token-based session management
 * across different types of users in the system.
 */

import 'dotenv/config';
import loginAdmin from '../../utils/authentification_controller_utils/admin_utils/loginAdmin.js';
import checkPatientPassword from '../../utils/authentification_controller_utils/patient_utils/checkPAtientPassword.js';
import loginPatient from '../../utils/authentification_controller_utils/patient_utils/loginPatient.js';
import registerPatient from '../../utils/authentification_controller_utils/patient_utils/registerPatient.js';
import loginTherapist from '../../utils/authentification_controller_utils/therapist_utils/loginTherapist.js';

const authentificationController = {
  // Function to register a new patient
  registerPatient,

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
