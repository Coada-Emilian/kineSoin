import { Router } from 'express';
import multer from 'multer';

import { patientPhotoStorage } from '../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../middlewares/controllerWrapper.js';
import patientController from '../controllers/patientController.js';

const uploadPatientPhoto = multer({ storage: patientPhotoStorage });

export const privateRouter = Router();

privateRouter.get('/patient', wrapper(patientController.getConnectedPatient));
