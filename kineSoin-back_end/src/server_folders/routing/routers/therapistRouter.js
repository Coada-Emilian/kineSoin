// Purpose: Define the therapist router, which contains the routes that are accessible to the therapists.

import { Router } from 'express';
import multer from 'multer';
import { therapistPhotoStorage } from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import { authenticateTherapist } from '../../middlewares/userAuthentication.js';
import appointmentController from '../controllers/appointmentController.js';
import messageController from '../controllers/messageController.js';
import patientController from '../controllers/patientController.js';
import prescriptionController from '../controllers/prescriptionController.js';
import therapistController from '../controllers/therapistController.js';

const uploadTherapistPhoto = multer({ storage: therapistPhotoStorage });

export const therapistRouter = Router();

// Route to retrieve the connected therapist dashboard data
therapistRouter.get(
  '/me/dashboard',
  authenticateTherapist,
  wrapper(appointmentController.getTherapistDashboardData)
);

// Route to send a message to the patient from the therapist
therapistRouter.post(
  '/me/patients/:patient_id/messages',
  authenticateTherapist,
  wrapper(messageController.sendMessageToPatientAsTherapist)
);

// Route to delete an appointment as a therapist
therapistRouter.delete(
  '/me/appointments/:appointment_id',
  authenticateTherapist,
  wrapper(appointmentController.deleteAppointmentAsTherapist)
);

// Route to get all patients as therapist
therapistRouter.get(
  '/me/allPatients',
  authenticateTherapist,
  wrapper(patientController.getAllPatientsAsTherapist)
);

// Route to delete a patient as a therapist
therapistRouter.delete(
  '/me/patients/:patient_id',
  authenticateTherapist,
  wrapper(patientController.deletePatientAsTherapist)
);

// Route to toggle the patient status as a therapist
therapistRouter.patch(
  '/me/patients/:patient_id/toggleStatus',
  authenticateTherapist,
  wrapper(patientController.togglePatientStatusAsTherapist)
);

// Route to get a patient's details as a therapist
therapistRouter.get(
  '/me/patients/:patient_id',
  authenticateTherapist,
  wrapper(patientController.getOnePatientAsTherapist)
);

// therapistRouter.patch(
//   '/me/prescriptions/:prescription_id/increaseQuantity',
//   authenticateTherapist,
//   wrapper(
//     appointmentController.incrementPrescriptionAppointmentQuantityAsTherapist
//   )
// );

// therapistRouter.patch(
//   '/me/prescriptions/:prescription_id/reduceQuantity',
//   authenticateTherapist,
//   wrapper(
//     appointmentController.decrementPrescriptionAppointmentQuantityAsTherapist
//   )
// );

// therapistRouter.get(
//   '/me/allMyPatients',
//   authenticateTherapist,
//   wrapper(patientController.getAllAppointedPatientsAsTherapist)
// );

therapistRouter.patch(
  '/me/patients/:patient_id',
  authenticateTherapist,
  wrapper(patientController.updatePatientAsTherapist)
);

therapistRouter.get(
  '/me/therapists',
  authenticateTherapist,
  wrapper(therapistController.getAllTherapistsAsTherapist)
);

therapistRouter.get(
  '/me/allAppointments',
  authenticateTherapist,
  wrapper(appointmentController.getAllAppointmentAsTherapist)
);

therapistRouter.get(
  '/me/patient/:patient_id/appointments',
  authenticateTherapist,
  wrapper(appointmentController.getPatientAppointmentsAsTherapist)
);

therapistRouter.get(
  '/me/patient/:patient_id/prescriptions',
  authenticateTherapist,
  wrapper(prescriptionController.getPatientPrescriptionsAsTherapist)
);

therapistRouter.get(
  '/me',
  wrapper(therapistController.getConnectedTherapistData)
);

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

therapistRouter.post(
  '/me/newAppointment',
  wrapper(appointmentController.proposeOneAppointmentAsTherapist)
);

// therapistRouter.get(
//   '/me/pendingPatients',
//   wrapper(patientController.getPendingPatients)
// );.
