import { Router } from 'express';
import multer from 'multer';

import {
  patientPhotoStorage,
  prescriptionScanStorage,
  therapistPhotoStorage,
} from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import patientController from '../controllers/patientController.js';
import appointmentController from '../controllers/appointmentController.js';
import messageController from '../controllers/messageController.js';
import prescriptionController from '../controllers/prescriptionController.js';
import therapistController from '../controllers/therapistController.js';
import adminController from '../controllers/adminController.js';

const uploadTherapistPhoto = multer({ storage: therapistPhotoStorage });

export const adminRouter = Router();

adminRouter.post('/login', wrapper(adminController.loginAdmin));

adminRouter.get('/therapists', wrapper(therapistController.getAllTherapists));
adminRouter.get(
  '/therapists/:therapist_id',
  wrapper(therapistController.getOneTherapist)
);
adminRouter.post(
  '/therapists',
  uploadTherapistPhoto.single('photo'),
  wrapper(therapistController.createTherapist)
);
adminRouter.delete(
  '/therapists/:therapist_id',
  wrapper(therapistController.deleteTherapist)
);

adminRouter.get('/allPatients', wrapper(patientController.getAllPatients));
adminRouter.get(
  '/activePatients',
  wrapper(patientController.getActivePatients)
);
adminRouter.get(
  '/pendingPatients',
  wrapper(patientController.getPendingPatients)
);
adminRouter.get(
  '/bannedPatients',
  wrapper(patientController.getBannedPatients)
);
adminRouter.get(
  '/inactivePatients',
  wrapper(patientController.getInactivePatients)
);
adminRouter.get(
  '/patients/:patient_id',
  wrapper(patientController.getOnePatient)
);
