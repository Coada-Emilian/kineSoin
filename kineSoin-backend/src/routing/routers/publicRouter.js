/**
 * @description Express router defining all public (unauthenticated) authentication endpoints.
 *
 * Rationale:
 * - Centralizes patient and therapist login flows, along with patient registration,
 *   into a single, predictable entry point for unauthenticated access.
 * - Keeps the router focused on wiring requests, delegating business logic to
 *   dedicated controllers and using `controllerWrapper` for consistent error handling.
 *
 * Notes:
 * - Uses Multer + Cloudinary storage for patient photo uploads during registration.
 * - All routes are intentionally public; authentication middleware is applied only
 *   in protected routers.
 */


import { Router } from 'express';
import multer from 'multer';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import { authenticationController, registrationController } from "../controllers/index.js";

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
  wrapper(authenticationController.loginPatient)
);

// Route to login a therapist
publicRouter.post(
  '/loginTherapist',
  wrapper(authenticationController.loginTherapist)
);
