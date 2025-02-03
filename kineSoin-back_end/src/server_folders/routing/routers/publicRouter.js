/**
 * @description Defines the public router, which contains the routes that are accessible to the public.
 *
 * This module:
 * - Imports the Router class from the express module to create a new router.
 * - Imports the patientPhotoStorage configuration from the cloudinary module.
 * - Imports the controllerWrapper middleware to wrap controller functions and catch errors.
 * - Imports the authentificationController that contains the authentication-related controller functions.
 * - Imports the multer module to handle file uploads.
 * - Configures multer to use the patientPhotoStorage for storing uploaded patient photos.
 * - Creates a new router instance using Router().
 *
 * The public router defines the following routes:
 * - POST /registerPatient: Registers a new patient.
 *   - Uses multer middleware to handle photo uploads (single file) with storage configuration.
 *   - Wraps the registerPatient controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /loginPatient: Logs in a patient.
 *   - Wraps the loginPatient controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /loginTherapist: Logs in a therapist.
 *   - Wraps the loginTherapist controller function with the controllerWrapper to catch and handle errors.
 *
 * Ensure that the express, cloudinary, controllerWrapper, authentificationController, and multer modules are installed and properly configured before using this setup.
 */

import { Router } from 'express';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import authentificationController from '../controllers/authentificationController.js';
import multer from 'multer';

const uploadPatientPhoto = multer({ storage: patientPhotoStorage });

export const publicRouter = Router();

// Route to register a new patient
publicRouter.post(
  '/registerPatient',
  uploadPatientPhoto.single('photo'),
  wrapper(authentificationController.registerPatient)
);

// Route to login a patient
publicRouter.post(
  '/loginPatient',
  wrapper(authentificationController.loginPatient)
);

publicRouter.post(
  '/loginTherapist',
  wrapper(authentificationController.loginTherapist)
);
