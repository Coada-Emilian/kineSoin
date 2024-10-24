// Purpose: Define the routes for the admin user.

import { Router } from 'express';
import multer from 'multer';
import { therapistPhotoStorage } from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import patientController from '../controllers/patientController.js';
import therapistController from '../controllers/therapistController.js';
import authentificationController from '../controllers/authentificationController.js';
import afflictionController from '../controllers/afflictionController.js';
import medicController from '../controllers/medicController.js';
import { authenticateAdmin } from '../../middlewares/authenticateAdmin.js';

const uploadTherapistPhoto = multer({ storage: therapistPhotoStorage });

export const adminRouter = Router();

adminRouter.post('/login', wrapper(authentificationController.loginAdmin));

adminRouter.get('/therapists', wrapper(therapistController.getAllTherapists));
adminRouter.get(
  '/therapists/:therapist_id',
  wrapper(therapistController.getOneTherapist)
);
adminRouter.post(
  '/therapists',
  authenticateAdmin,
  uploadTherapistPhoto.single('photo'),
  wrapper(therapistController.createTherapist)
);
adminRouter.put(
  '/therapists/:therapist_id',
  uploadTherapistPhoto.single('file'),
  wrapper(therapistController.updateTherapist)
);
adminRouter.put(
  '/therapists/:therapist_id/toggleStatus',
  wrapper(therapistController.toggleTherapistStatus)
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
adminRouter.put(
  '/patients/:patient_id',
  wrapper(patientController.updatePatientStatus)
);
adminRouter.delete(
  '/patients/:patient_id',
  wrapper(patientController.deletePatient)
);

adminRouter.get(
  '/afflictions',
  wrapper(afflictionController.getAllAfflictions)
);
adminRouter.post(
  '/afflictions',
  wrapper(afflictionController.createAffliction)
);
adminRouter.get(
  '/afflictions/:affliction_id',
  wrapper(afflictionController.getOneAffliction)
);

adminRouter.put(
  '/afflictions/:affliction_id',
  wrapper(afflictionController.updateAffliction)
);
adminRouter.delete(
  '/afflictions/:affliction_id',
  wrapper(afflictionController.deleteAffliction)
);

adminRouter.get('/medics', wrapper(medicController.getAllMedics));
adminRouter.post('/medics', wrapper(medicController.createMedic));
adminRouter.get('/medics/:medic_id', wrapper(medicController.getOneMedic));
adminRouter.put('/medics/:medic_id', wrapper(medicController.updateMedic));
adminRouter.delete('/medics/:medic_id', wrapper(medicController.deleteMedic));

adminRouter.get(
  '/bodyRegions',
  wrapper(afflictionController.getAllBodyRegions)
);
adminRouter.post(
  '/bodyRegions',
  wrapper(afflictionController.createBodyRegion)
);
adminRouter.delete(
  '/bodyRegions/:body_region_id',
  wrapper(afflictionController.deleteBodyRegion)
);
