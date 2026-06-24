/**
 * @description Express router handling public authentication routes for the application.
 *
 * This module:
 * - Creates a dedicated router for unauthenticated (public) access.
 * - Handles patient and therapist authentication entry points.
 * - Supports patient registration with profile photo upload via Multer + Cloudinary storage.
 * - Delegates business logic to the authentication controller.
 * - Wraps controller functions using a controller wrapper to ensure centralized error handling.
 *
 * Routes exposed:
 *
 * POST /registerPatient
 * - Registers a new patient in the system.
 * - Accepts multipart/form-data including a profile photo under the field name "photo".
 * - Uploads the photo to Cloudinary via Multer storage configuration.
 * - Passes request data to the registerPatient controller.
 *
 * POST /loginPatient
 * - Authenticates a patient using provided credentials.
 * - Delegates authentication logic to the controller.
 *
 * POST /loginTherapist
 * - Authenticates a therapist using provided credentials.
 * - Delegates authentication logic to the controller.
 *
 * Notes:
 * - All routes are public and do not require authentication middleware.
 * - Error handling is managed via a controller wrapper middleware.
 * - File upload handling is only applied where required (patient registration).
 */

import { Router } from 'express';
import multer from 'multer';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import authentificationController from '../controllers/authentificationController.js';
import registrationController from '../controllers/registrationController.js';

const uploadPatientPhoto = multer({ storage: patientPhotoStorage });

export const publicRouter = Router();

// Route to register a new patient
publicRouter.post(
  '/registerPatient',
  uploadPatientPhoto.single('picture'),
  wrapper(registrationController.registerPatient)
);

// Route to login a patient
publicRouter.post(
  '/loginPatient',
  wrapper(authentificationController.loginPatient)
);

// Route to login a therapist
publicRouter.post(
  '/loginTherapist',
  wrapper(authentificationController.loginTherapist)
);
