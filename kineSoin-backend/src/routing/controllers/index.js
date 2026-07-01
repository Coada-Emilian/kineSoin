/**
 * @description Central export hub for all controllers in the application.
 *
 * Rationale:
 * - Provides a single, predictable entry point for every controller module,
 *   keeping routing clean and preventing scattered imports across the codebase.
 * - Ensures consistent organization by grouping domain‑specific controllers
 *   (auth, registration, appointments, messaging, etc.) into one unified module.
 *
 * Notes:
 * - Helps maintain a clear separation of concerns: each controller handles its
 *   own domain logic, while this index file simply exposes them for use in routes.
 */

import afflictionController from "./afflictionController.js";
import appointmentController from "./appointmentController.js";
import authenticationController from "./authenticationController.js";
import insuranceController from "./insuranceController.js";
import medicController from "./medicController.js";
import messageController from "./messageController.js";
import patientController from "./patientController.js";
import prescriptionController from "./prescriptionController.js";
import registrationController from "./registrationController.js";
import therapistController from "./therapistController.js";

export {
      afflictionController,
      appointmentController,
      authenticationController,
      insuranceController,
      medicController,
      messageController,
      patientController,
      prescriptionController,
      registrationController,
      therapistController
};

