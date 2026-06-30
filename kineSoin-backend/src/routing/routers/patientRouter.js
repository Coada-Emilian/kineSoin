/**
 * @description Express router defining all patient‑side API endpoints.
 *
 * Rationale:
 * - Centralizes every patient‑facing route in one place, giving the application a
 *   predictable and well‑structured entry point for authenticated patient actions.
 * - Enforces strict access control through `authenticatePatient`, ensuring only
 *   the logged‑in patient can access or modify their own data.
 *
 * Notes:
 * - Uses Multer + Cloudinary storage for patient photo and prescription scan uploads.
 * - Follows a clear RESTful layout, keeping endpoints easy to navigate and making
 *   future patient features straightforward to add.
 * - Delegates business logic to dedicated controllers, keeping the router focused
 *   solely on request wiring and middleware composition.
 */

import { Router } from 'express';
import multer from 'multer';
import {
  patientPhotoStorage,
  prescriptionScanStorage,
} from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import { authenticatePatient } from '../../middlewares/userAuthentication.js';
import { afflictionController, appointmentController, authenticationController, insuranceController, medicController, messageController, patientController, prescriptionController, therapistController } from "../controllers/index.js";

const uploadPatientPhoto = multer({ storage: patientPhotoStorage });
const uploadPrescriptionScan = multer({ storage: prescriptionScanStorage });

export const patientRouter = Router();

// Route to get all appointments for a patient
patientRouter.get(
  '/me/appointments',
  authenticatePatient,
  wrapper(appointmentController.getAllAppointmentsAsPatient)
);

// Route to create a new prescription for a patient
patientRouter.post(
  '/me/prescriptions',
  authenticatePatient,
  uploadPrescriptionScan.single('scan'),
  wrapper(prescriptionController.addNewPrescription)
);

// Route to get all prescriptions for a patient
patientRouter.get(
  '/me/prescriptions',
  authenticatePatient,
  wrapper(prescriptionController.getAllPrescriptionsAsPatient)
);

// Route to get all appointments for a prescription
patientRouter.get(
  '/me/prescriptions/:prescription_id/appointments',
  authenticatePatient,
  wrapper(appointmentController.getAllAppointmentsForPrescriptionAsPatient)
);

// Route to get all messages for a patient
patientRouter.get(
  '/me/messages',
  authenticatePatient,
  wrapper(messageController.getAllMessagesAsPatient)
);

// Route to send a message to a therapist
patientRouter.post(
  '/me/messages',
  authenticatePatient,
  wrapper(messageController.sendMessageToTherapist)
);

// Route to get the personal therapist of a patient
patientRouter.get(
  '/me/therapist',
  authenticatePatient,
  wrapper(therapistController.getPersonalTherapistAsPatient)
);

// Route to get the connected patient data
patientRouter.get(
  '/me',
  authenticatePatient,
  wrapper(patientController.getConnectedPatientData)
);

// Route to get the insurances of a patient
patientRouter.get(
  '/me/insurances',
  authenticatePatient,
  wrapper(insuranceController.getInsurancesAsPatient)
);

// Route to check the credentials of a patient
patientRouter.post(
  '/me/checkCredentials',
  authenticatePatient,
  wrapper(authenticationController.checkPatientPassword)
);

// Route to add an insurance to a patient
patientRouter.post(
  '/me/insurance',
  authenticatePatient,
  wrapper(insuranceController.addInsuranceAsPatient)
);

// Route to update the connected patient data
patientRouter.patch(
  '/me',
  authenticatePatient,
  wrapper(patientController.updateConnectedPatient)
);

// Route to update the insurance of a patient
patientRouter.patch(
  '/me/insurance',
  authenticatePatient,
  wrapper(insuranceController.updateInsuranceAsPatient)
);

// Route to post a photo of a patient
patientRouter.post(
  '/me/uploadPhoto',
  authenticatePatient,
  uploadPatientPhoto.single('photo'),
  patientController.uploadPatientPhoto
);

patientRouter.get(
  '/me/medicNames',
  authenticatePatient,
  wrapper(medicController.getMedicNamesAsPatient)
);

patientRouter.get(
  '/me/afflictionNames',
  authenticatePatient,
  wrapper(afflictionController.getAfflictionNamesAsPatient)
);

// Unused routes

// patientRouter.get(
//   '/me/dashboard',
//   wrapper(patientController.getPatientDashboardData)
// );

// patientRouter.delete('/me', wrapper(patientController.deleteConnectedPatient));

// patientRouter.get('/me/insurance', wrapper(insuranceController.getInsurance));

// patientRouter.get(
//   '/:patientId/proposedAppointments',
//   wrapper(appointmentController.getAllProposedAppointments)
// );

// patientRouter.get(
//   '/me/proposedAppointments/:id',
//   wrapper(appointmentController.getOneProposedAppointment)
// );

// patientRouter.post(
//   '/me/proposedAppointments/:id',
//   wrapper(appointmentController.acceptOneProposedAppointment)
// );

// patientRouter.get(
//   '/me/appointments/:id',
//   wrapper(appointmentController.getOneAppointment)
// );

// patientRouter.put(
//   '/me/appointments/:id/cancelAppointment',
//   wrapper(appointmentController.cancelOneAppointment)
// );

// patientRouter.get(
//   '/me/prescriptions/:id',
//   wrapper(prescriptionController.getOnePrescription)
// );
