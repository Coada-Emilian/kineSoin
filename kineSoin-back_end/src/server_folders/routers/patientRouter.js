import { Router } from 'express';
import multer from 'multer';

import {
  patientPhotoStorage,
  prescriptionScanStorage,
} from '../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../middlewares/controllerWrapper.js';
import patientController from '../controllers/patientController.js';

const uploadPatientPhoto = multer({ storage: patientPhotoStorage });
const uploadPrescriptionScan = multer({ storage: prescriptionScanStorage });

export const patientRouter = Router();

patientRouter.get('/me', wrapper(patientController.getConnectedPatient));
patientRouter.delete(
  '/me',
  wrapper(patientController.deleteConnectedPatient)
);
