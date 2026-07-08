/**
 * @description Express router defining all admin‑side API endpoints.
 *
 * Rationale:
 * - Centralizes every administrative route in one place, giving the backend a
 *   predictable and well‑structured entry point for all privileged operations.
 * - Enforces strict access control through `authenticateAdmin`, ensuring only
 *   authorized admins can perform CRUD actions across therapists, patients,
 *   afflictions, medics, body regions, and insurance organisms.
 *
 * Notes:
 * - Uses `controllerWrapper` for consistent async error handling and Multer +
 *   Cloudinary storage for therapist photo uploads.
 * - Follows a clear RESTful layout, keeping endpoints easy to navigate and
 *   making future admin features straightforward to add.
 */

import { Router } from 'express';
import multer from 'multer';
import { therapistPhotoStorage } from '../../cloudinary/index.js';
import authenticateUser from '../../middlewares/authenticateUser.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import {
  afflictionController,
  bodyRegionController,
  insuranceController,
  medicController,
  patientController,
  therapistController,
} from '../controllers/index.js';

const uploadTherapistPhoto = multer({ storage: therapistPhotoStorage });

export const adminRouter = Router();

adminRouter.use(authenticateUser);

// Route to get all therapists as admin
adminRouter.get(
  '/therapists',
  wrapper(therapistController.getAllTherapistsAsAdmin)
);

// Route to get one therapist as admin
adminRouter.get(
  '/therapists/:therapist_id',
  wrapper(therapistController.getOneTherapistAsAdmin)
);

// Route to create a new therapist as admin
adminRouter.post(
  '/therapists',
  uploadTherapistPhoto.single('photo'),
  wrapper(therapistController.createTherapistAsAdmin)
);

// Route to update a therapist as admin
adminRouter.put(
  '/therapists/:therapist_id',
  uploadTherapistPhoto.single('file'),
  wrapper(therapistController.updateTherapistAsAdmin)
);

// Route to toggle therapist status change as admin
adminRouter.put(
  '/therapists/:therapist_id/changeStatus',
  wrapper(therapistController.changeTherapistStatusAsAdmin)
);

// Route to toggle therapist status as admin
adminRouter.patch(
  '/therapists/:therapist_id/toggleStatus',
  wrapper(therapistController.toggleTherapistStatusAsAdmin)
);

// Route to delete a therapist as admin
adminRouter.delete(
  '/therapists/:therapist_id',
  wrapper(therapistController.deleteTherapistAsAdmin)
);

// Route to get all patients as admin
adminRouter.get(
  '/allPatients',
  wrapper(patientController.getAllPatientsAsAdmin)
);

// Route to get one patient as admin
adminRouter.get(
  '/patients/:patient_id',
  wrapper(patientController.getOnePatientAsAdmin)
);

// Route to change patient status as admin
adminRouter.put(
  '/patients/:patient_id/changeStatus',
  wrapper(patientController.changePatientStatusAsAdmin)
);

// Route to delete a patient as admin
adminRouter.delete(
  '/patients/:patient_id',
  wrapper(patientController.deletePatientAsAdmin)
);

// Route to get all afflictions as admin
adminRouter.get(
  '/afflictions',
  wrapper(afflictionController.getAllAfflictionsAsAdmin)
);

// Route to get one affliction as admin
adminRouter.get(
  '/afflictions/:affliction_id',
  wrapper(afflictionController.getOneAfflictionAsAdmin)
);

// Route to create a new affliction as admin
adminRouter.post(
  '/afflictions',
  wrapper(afflictionController.createAfflictionAsAdmin)
);

// Route to delete an affliction as admin
adminRouter.delete(
  '/afflictions/:affliction_id',
  wrapper(afflictionController.deleteAfflictionAsAdmin)
);

// Route to update an affliction as admin
adminRouter.put(
  '/afflictions/:affliction_id',
  wrapper(afflictionController.updateAfflictionAsAdmin)
);

// Route to get all body regions as admin
adminRouter.get(
  '/bodyRegions',
  wrapper(bodyRegionController.getAllBodyRegionsAsAdmin)
);

// Route to create a new body region as admin
adminRouter.post(
  '/bodyRegions',
  wrapper(bodyRegionController.createBodyRegionAsAdmin)
);

// Route to delete a body region as admin
adminRouter.delete(
  '/bodyRegions/:body_region_id',
  wrapper(bodyRegionController.deleteBodyRegionAsAdmin)
);

// Route to get all medics as admin
adminRouter.get('/medics', wrapper(medicController.getAllMedicsAsAdmin));

// Route to get one medic as admin
adminRouter.get(
  '/medics/:medic_id',
  wrapper(medicController.getOneMedicAsAdmin)
);

// Route to create a new medic as admin
adminRouter.post('/medics', wrapper(medicController.createMedicAsAdmin));

// Route to update a medic as admin
adminRouter.put(
  '/medics/:medic_id',
  wrapper(medicController.updateMedicAsAdmin)
);

// Route to delete a medic as admin
adminRouter.delete(
  '/medics/:medic_id',
  wrapper(medicController.deleteMedicAsAdmin)
);

// Route to get all insurance organisms as admin
adminRouter.get(
  '/insuranceOrganisms',
  wrapper(insuranceController.getAllInsuranceOrganismsAsAdmin)
);

// Route to get one insurance organism as admin
adminRouter.get(
  '/insuranceOrganisms/:insurance_id',
  wrapper(insuranceController.getOneInsuranceOrganismAsAdmin)
);

// Route to create a new insurance organism as admin
adminRouter.post(
  '/insuranceOrganisms',
  wrapper(insuranceController.createInsuranceOrganismAsAdmin)
);

// Route to delete an insurance organism as admin
adminRouter.delete(
  '/insuranceOrganisms/:insurance_id',
  wrapper(insuranceController.deleteInsuranceOrganismAsAdmin)
);

// Route to update an insurance organism as admin
adminRouter.put(
  '/insuranceOrganisms/:insurance_id',
  wrapper(insuranceController.updateInsuranceOrganismAsAdmin)
);
