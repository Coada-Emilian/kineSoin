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
import insuranceController from '../controllers/insuranceController.js';

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

patientRouter.get('/insurance', wrapper(insuranceController.getInsurance));
patientRouter.patch('/insurance', wrapper(insuranceController.updateInsurance));
patientRouter.post('/insurance', wrapper(insuranceController.addInsurance));

patientRouter.get(
  '/proposedAppointments',
  wrapper(appointmentController.getAllProposedAppointments)
);
patientRouter.get(
  '/proposedAppointments/:id',
  wrapper(appointmentController.getOneProposedAppointment)
);
patientRouter.post(
  '/proposedAppointments/:id',
  wrapper(appointmentController.acceptOneProposedAppointment)
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
