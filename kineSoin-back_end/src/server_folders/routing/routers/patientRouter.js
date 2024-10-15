import { Router } from 'express';
import multer from 'multer';

import {
  patientPhotoStorage,
  prescriptionScanStorage,
} from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import patientController from '../controllers/patientController.js';
import appointmentController from '../controllers/appointmentController.js';
import messageController from '../controllers/messageController.js';
import prescriptionController from '../controllers/prescriptionController.js';
import therapistController from '../controllers/therapistController.js';

const uploadPatientPhoto = multer({ storage: patientPhotoStorage });
const uploadPrescriptionScan = multer({ storage: prescriptionScanStorage });

export const patientRouter = Router();

patientRouter.get('/me', wrapper(patientController.getConnectedPatient));
patientRouter.delete('/me', wrapper(patientController.deleteConnectedPatient));
patientRouter.patch('/me', wrapper(patientController.updateConnectedPatient));
patientRouter.post(
  '/me/uploadPhoto',
  uploadPatientPhoto.single('photo'),
  patientController.uploadPatientPhoto
);

patientRouter.get(
  '/appointments',
  wrapper(appointmentController.getAllAppointments)
);
patientRouter.get(
  '/appointments/:id',
  wrapper(appointmentController.getOneAppointment)
);
patientRouter.put(
  '/appointments/:id/cancelAppointment',
  wrapper(appointmentController.cancelOneAppointment)
);

patientRouter.get('/messages', wrapper(messageController.getAllMessages));
patientRouter.post(
  '/messages',
  wrapper(messageController.sendMessageToTherapist)
);

patientRouter.get(
  '/prescriptions',
  wrapper(prescriptionController.getAllPrescriptions)
);
patientRouter.get(
  '/prescriptions/:id',
  wrapper(prescriptionController.getOnePrescription)
);
patientRouter.post(
  '/prescriptions',
  uploadPrescriptionScan.single('scan'),
  wrapper(prescriptionController.addNewPrescription)
);

patientRouter.get(
  '/myTherapist',
  wrapper(therapistController.getPersonalTherapist)
);
