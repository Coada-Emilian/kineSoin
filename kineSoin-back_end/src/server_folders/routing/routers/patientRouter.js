/**
 * @description Defines the patient router, which contains the routes that are accessible to the patients.
 *
 * This module:
 * - Imports the Router class from the express module to create a new router.
 * - Imports the patientPhotoStorage and prescriptionScanStorage configurations from the cloudinary module.
 * - Imports the controllerWrapper middleware to wrap controller functions and catch errors.
 * - Imports controller modules for handling various entities: patientController, appointmentController, messageController, prescriptionController, therapistController, and insuranceController.
 * - Imports the multer module to handle file uploads.
 * - Imports the authenticatePatient middleware to authenticate patient users.
 * - Configures multer to use the patientPhotoStorage and prescriptionScanStorage for storing uploaded patient photos and prescription scans, respectively.
 * - Creates a new router instance using Router().
 *
 * The patient router defines the following routes:
 * - GET /me/appointments: Retrieves all appointments for a patient.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Wraps the getAllAppointments controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /me/prescriptions: Creates a new prescription for a patient.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Uses multer middleware to handle prescription scan uploads (single file) with storage configuration.
 *   - Wraps the addNewPrescription controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /me/prescriptions: Retrieves all prescriptions for a patient.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Wraps the getAllPrescriptions controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /me/prescriptions/:prescription_id/appointments: Retrieves all appointments for a prescription.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Wraps the getAllAppointmentsForPrescription controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /me/messages: Retrieves all messages for a patient.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Wraps the getAllMessages controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /me/messages: Sends a message to a therapist.
 *   - Wraps the sendMessageToTherapist controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /me/therapist: Retrieves the personal therapist of a patient.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Wraps the getPersonalTherapist controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /me: Retrieves the connected patient data.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Wraps the getConnectedPatientData controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /me/insurances: Retrieves the insurances of a patient.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Wraps the getInsurancesAsPatient controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /me/checkCredentials: Checks the credentials of a patient.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Wraps the checkPatientPassword controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /me/insurance: Adds an insurance to a patient.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Wraps the addInsurance controller function with the controllerWrapper to catch and handle errors.
 *
 * - PATCH /me: Updates the connected patient data.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Wraps the updateConnectedPatient controller function with the controllerWrapper to catch and handle errors.
 *
 * - PATCH /me/insurance: Updates the insurance of a patient.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Wraps the updateInsurance controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /me/uploadPhoto: Posts a photo of a patient.
 *   - Uses authenticatePatient middleware to authenticate patient users.
 *   - Uses multer middleware to handle patient photo uploads (single file) with storage configuration.
 *   - Uses the uploadPatientPhoto controller function directly.
 *
 * Unused routes (commented out):
 * - GET /me/dashboard: Retrieves the patient dashboard data.
 * - DELETE /me: Deletes the connected patient data.
 * - GET /me/insurance: Retrieves the insurance of a patient.
 * - GET /:patientId/proposedAppointments: Retrieves all proposed appointments for a patient.
 * - GET /me/proposedAppointments/:id: Retrieves a specific proposed appointment.
 * - POST /me/proposedAppointments/:id: Accepts a specific proposed appointment.
 * - GET /me/appointments/:id: Retrieves a specific appointment.
 * - PUT /me/appointments/:id/cancelAppointment: Cancels a specific appointment.
 * - GET /me/prescriptions/:id: Retrieves a specific prescription.
 *
 * Ensure that the express, cloudinary, controllerWrapper, multer, patientController, appointmentController, messageController, prescriptionController, therapistController, insuranceController, and authenticatePatient modules are installed and properly configured before using this setup.
 */

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
import { authenticatePatient } from '../../middlewares/userAuthentication.js';

const uploadPatientPhoto = multer({ storage: patientPhotoStorage });
const uploadPrescriptionScan = multer({ storage: prescriptionScanStorage });

export const patientRouter = Router();

// Route to get all appointments for a patient
patientRouter.get(
  '/me/appointments',
  authenticatePatient,
  wrapper(appointmentController.getAllAppointments)
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
  wrapper(prescriptionController.getAllPrescriptions)
);

// Route to get all appointments for a prescription
patientRouter.get(
  '/me/prescriptions/:prescription_id/appointments',
  authenticatePatient,
  wrapper(appointmentController.getAllAppointmentsForPrescription)
);

// Route to get all messages for a patient
patientRouter.get(
  '/me/messages',
  authenticatePatient,
  wrapper(messageController.getAllMessages)
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
  wrapper(therapistController.getPersonalTherapist)
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
  wrapper(authentificationController.checkPatientPassword)
);

// Route to add an insurance to a patient
patientRouter.post(
  '/me/insurance',
  authenticatePatient,
  wrapper(insuranceController.addInsurance)
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
  wrapper(insuranceController.updateInsurance)
);

// Route to post a photo of a patient
patientRouter.post(
  '/me/uploadPhoto',
  authenticatePatient,
  uploadPatientPhoto.single('photo'),
  patientController.uploadPatientPhoto
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
