import { Router } from 'express';
import multer from 'multer';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import {
  authenticationController,
  registrationController,
} from '../controllers/index.js';

const uploadPatientPhoto = multer({ storage: patientPhotoStorage });

export const authenticationRouter = Router();

authenticationRouter.post(
  '/refresh',
  wrapper(authenticationController.refreshAccessToken)
);

// Route to login an admin
authenticationRouter.post(
  '/admin/login',
  wrapper(authenticationController.loginAdmin)
);

// Route to register a new patient
authenticationRouter.post(
  '/patient/register',
  uploadPatientPhoto.single('picture'),
  wrapper(registrationController.registerPatient)
);

// Route to login a therapist
authenticationRouter.post(
  '/therapist/login',
  wrapper(authenticationController.loginTherapist)
);

// Route to login a patient
authenticationRouter.post(
  '/patient/login',
  wrapper(authenticationController.loginPatient)
);

// Route to logout a user
authenticationRouter.post(
  '/logout',
  wrapper(authenticationController.logoutUser)
);
