// Purpose: Define the public router, which contains the routes that are accessible to the public.

import { Router } from 'express';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import authentificationController from '../controllers/authentificationController.js';
import multer from 'multer';

const uploadPatientPhoto = multer({ storage: patientPhotoStorage });

export const publicRouter = Router();

publicRouter.post(
  '/registerPatient',
  uploadPatientPhoto.single('photo'),
  wrapper(authentificationController.registerPatient)
);

publicRouter.post(
  '/loginPatient',
  wrapper(authentificationController.loginPatient)
);

publicRouter.post(
  '/loginTherapist',
  wrapper(authentificationController.loginTherapist)
);
