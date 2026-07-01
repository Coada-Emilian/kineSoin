/**
 * @description Central controller export for patient registration.
 *
 * Rationale:
 * - Provides a single, predictable entry point for registration logic, keeping
 *   routing clean and preventing scattered imports across the codebase.
 * - Keeps the controller lightweight by delegating actual registration work to
 *   dedicated service modules, making future extensions straightforward.
 *
 * Notes:
 * - Uses environment‑based configuration for secure handling of sensitive data
 *   during account creation.
 */

import 'dotenv/config';
import registerPatient from './handlers/registration/registerPatient.js';

const registrationController = {
  // Function to register a new patient
  registerPatient,
};

export default registrationController;
