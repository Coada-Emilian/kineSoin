import { Router } from 'express';
import multer from 'multer';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import authentificationController from '../controllers/authentificationController.js';

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
