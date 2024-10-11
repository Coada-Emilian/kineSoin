// need to add checkedLoggedIn function

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

export const privateRouter = Router();

privateRouter.get('/patient', wrapper(patientController.getConnectedPatient));
privateRouter.delete('/patient', wrapper(patientController.deletePatient));
privateRouter.get(
  '/patient/appointments',
  wrapper(patientController.getAllAppointments)
);
privateRouter.get(
  '/patient/messages',
  wrapper(patientController.getAllMessages)
);
privateRouter.get(
  '/patient/prescriptions',
  wrapper(patientController.getAllPrescriptions)
);
