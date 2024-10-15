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

const uploadTherapistPhoto = multer({ storage: therapistPhotoStorage });

export const therapistRouter = Router();

therapistRouter.get('/me', wrapper(therapistController.getConnectedTherapist));
therapistRouter.delete(
  '/me',
  wrapper(therapistController.deleteConnectedTherapist)
);
therapistRouter.patch(
  '/me',
  wrapper(therapistController.updateConnectedTherapist)
);
therapistRouter.post(
  '/me/uploadPhoto',
  uploadTherapistPhoto.single('photo'),
  therapistController.uploadTherapistPhoto
);

therapistRouter.get(
  '/pendingPatients',
  wrapper(patientController.getPendingPatients)
);
therapistRouter.get(
  '/allMyPatients',
  wrapper(patientController.getAllMyPatients)
);
therapistRouter.get('/allPatients', wrapper(patientController.getAllPatients));
therapistRouter.get('/patients/:id', wrapper(patientController.getOnePatient));

therapistRouter.post(
  '/newAppointment',
  wrapper(appointmentController.addNewAppointment)
);
therapistRouter.get('/appointments', wrapper(appointmentController.getAllMyAppointments));
