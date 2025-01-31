// Purpose: Define the patient router, which contains the routes that are accessible to the patients.

import { Router } from 'express';
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
import multer from 'multer';
import authentificationController from '../controllers/authentificationController.js';

const uploadPatientPhoto = multer({ storage: patientPhotoStorage });
const uploadPrescriptionScan = multer({ storage: prescriptionScanStorage });

export const patientRouter = Router();

// Patient routes
patientRouter.get(
  '/me/dashboard',
  wrapper(patientController.getPatientDashboardData)
);

patientRouter.get(
  '/:patient_id',
  wrapper(patientController.getConnectedPatient)
);

patientRouter.delete('/me', wrapper(patientController.deleteConnectedPatient));

patientRouter.patch('/me', wrapper(patientController.updateConnectedPatient));

patientRouter.post(
  '/me/uploadPhoto',
  uploadPatientPhoto.single('photo'),
  patientController.uploadPatientPhoto
);

// Insurance routes
patientRouter.get(
  '/:patient_id/insurances',
  wrapper(insuranceController.getInsurancesAsPatient)
);

patientRouter.get('/me/insurance', wrapper(insuranceController.getInsurance));

patientRouter.patch(
  '/me/insurance',
  wrapper(insuranceController.updateInsurance)
);

patientRouter.post('/me/insurance', wrapper(insuranceController.addInsurance));

// Proposed appointments routes
patientRouter.get(
  '/:patientId/proposedAppointments',
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
  '/:patient_id/appointments',
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

patientRouter.get(
  '/:patient_id/prescriptions/:prescription_id/appointments',
  wrapper(appointmentController.getAllAppointmentsForPrescription)
);

// Messages routes
patientRouter.get(
  '/:patient_id/messages',
  wrapper(messageController.getAllMessages)
);

patientRouter.post(
  '/:patient_id/messages',
  wrapper(messageController.sendMessageToTherapist)
);

// Prescriptions routes
patientRouter.get(
  '/:patient_id/prescriptions',
  wrapper(prescriptionController.getAllPrescriptions)
);

patientRouter.get(
  '/me/prescriptions/:id',
  wrapper(prescriptionController.getOnePrescription)
);

patientRouter.post(
  '/:patient_id/prescriptions',
  uploadPrescriptionScan.single('scan'),
  wrapper(prescriptionController.addNewPrescription)
);

// Therapist routes
patientRouter.get(
  '/:patient_id/therapist',
  wrapper(therapistController.getPersonalTherapist)
);

patientRouter.post(
  '/:patient_id/checkCredentials',
  wrapper(authentificationController.checkPatientPassword)
);
