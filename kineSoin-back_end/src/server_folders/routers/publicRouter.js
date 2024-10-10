import { Router } from 'express';
import multer from 'multer';

import { patientPhotoStorage } from '../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../middlewares/controllerWrapper.js';

import authentificationController from '../controllers/authentificationController.js';

const uploadPatientPhoto = multer({ storage: patientPhotoStorage });

export const publicRouter = Router();

publicRouter.post(
  '/registerPatient',
  uploadPatientPhoto.single('photo'),
  wrapper(authentificationController.registerPatient)
);

// publicRouter.post(
//   '/patient-login',
//   wrapper(authentificationController.loginPatient)
// );

// publicRouter.post(
//   '/therapist-login',
//   wrapper(authentificationController.loginTherapist)
// );
