/**
 * @module registrationController
 * @description
 * Centralized controller registry for user registration operations.
 *
 * This module:
 * - Loads environment variables using `dotenv/config`.
 * - Aggregates registration-related controller functions.
 * - Provides a single structured export for registration routing and logic handling.
 *
 * Included functionalities:
 *
 * Patient Registration:
 * - registerPatient: Handles creation of a new patient account, including validation
 *   and persistence of patient data.
 *
 * Behavior:
 * - Acts as a centralized entry point for registration workflows.
 * - Currently focused on patient registration but structured for future expansion.
 * - Improves modularity and separation of concerns in authentication/registration logic.
 *
 * Security considerations:
 * - Relies on environment variables for configuration via `dotenv/config`.
 * - Delegates validation and business logic to dedicated utility functions.
 *
 * @exports {Object} registrationController - Collection of registration controller functions.
 */

import 'dotenv/config';
import registerPatient from '../../utils/registration_controller_utils/registerPatient.js';

const registrationController = {
  // Function to register a new patient
  registerPatient,
};

export default registrationController;
