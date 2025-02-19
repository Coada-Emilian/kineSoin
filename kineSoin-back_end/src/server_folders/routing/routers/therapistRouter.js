// Purpose: Define the therapist router, which contains the routes that are accessible to the therapists.

import { Router } from 'express';
import multer from 'multer';
import { therapistPhotoStorage } from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import patientController from '../controllers/patientController.js';
import appointmentController from '../controllers/appointmentController.js';
import therapistController from '../controllers/therapistController.js';
import { authenticateTherapist } from '../../middlewares/userAuthentication.js';

const uploadTherapistPhoto = multer({ storage: therapistPhotoStorage });

export const therapistRouter = Router();

therapistRouter.get(
  '/me/dashboard',
  authenticateTherapist,
  wrapper(therapistController.getTherapistDashboardData)
);

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

// therapistRouter.get(
//   '/me/pendingPatients',
//   wrapper(patientController.getPendingPatients)
// );.


therapistRouter.get(
  '/me/allPatients',
  wrapper(patientController.getAllPatients)
);

therapistRouter.get(
  '/me/patients/:patient_id',
  wrapper(patientController.getOnePatient)
);

therapistRouter.post(
  '/me/newAppointment',
  wrapper(appointmentController.addNewAppointment)
);

therapistRouter.get(
  '/me/appointments',
  wrapper(appointmentController.getAllMyAppointments)
);

therapistRouter.post(
  '/me/patients/:patient_id/messages',
  authenticateTherapist,
  wrapper(therapistController.sendMessageToPatient)
);

therapistRouter.delete(
  '/me/appointments/:appointment_id',
  authenticateTherapist,
  wrapper(appointmentController.deleteAppointment)
);

therapistRouter.patch(
  '/me/prescriptions/:prescription_id/addQuantity',
  authenticateTherapist,
  wrapper(appointmentController.addToPrescriptionAppointmentQuantity)
);

therapistRouter.patch(
  '/me/prescriptions/:prescription_id/reduceQuantity',
  authenticateTherapist,
  wrapper(appointmentController.reduceFromPrescriptionAppointmentQuantity)
);

therapistRouter.get(
  '/me/allMyPatients',
  authenticateTherapist,
  wrapper(patientController.getAllMyPatients)
);
