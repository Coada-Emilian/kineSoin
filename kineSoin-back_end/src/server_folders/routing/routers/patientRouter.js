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

// Patient routes
patientRouter.get('/me', wrapper(patientController.getConnectedPatient));
patientRouter.delete('/me', wrapper(patientController.deleteConnectedPatient));
patientRouter.patch('/me', wrapper(patientController.updateConnectedPatient));
patientRouter.post(
  '/me/uploadPhoto',
  uploadPatientPhoto.single('photo'),
  patientController.uploadPatientPhoto
);

// Insurance routes
patientRouter.get('/me/insurance', wrapper(insuranceController.getInsurance));
patientRouter.patch(
  '/me/insurance',
  wrapper(insuranceController.updateInsurance)
);
patientRouter.post('/me/insurance', wrapper(insuranceController.addInsurance));

// Proposed appointments routes
patientRouter.get(
  '/me/proposedAppointments',
  wrapper(appointmentController.getAllProposedAppointments)
);
patientRouter.get(
  '/me/proposedAppointments/:id',
  wrapper(appointmentController.getOneProposedAppointment)
);
patientRouter.post(
  '/me/proposedAppointments/:id',
  wrapper(appointmentController.acceptOneProposedAppointment)
);

// Appointments routes
patientRouter.get(
  '/me/appointments',
  wrapper(appointmentController.getAllAppointments)
);
patientRouter.get(
  '/me/appointments/:id',
  wrapper(appointmentController.getOneAppointment)
);
patientRouter.put(
  '/me/appointments/:id/cancelAppointment',
  wrapper(appointmentController.cancelOneAppointment)
);

patientRouter.get('/me/messages', wrapper(messageController.getAllMessages));
patientRouter.post(
  '/me/messages',
  wrapper(messageController.sendMessageToTherapist)
);

patientRouter.get(
  '/me/prescriptions',
  wrapper(prescriptionController.getAllPrescriptions)
);
patientRouter.get(
  '/me/prescriptions/:id',
  wrapper(prescriptionController.getOnePrescription)
);
patientRouter.post(
  '/me/prescriptions',
  uploadPrescriptionScan.single('scan'),
  wrapper(prescriptionController.addNewPrescription)
);

patientRouter.get(
  '/me/myTherapist',
  wrapper(therapistController.getPersonalTherapist)
);
