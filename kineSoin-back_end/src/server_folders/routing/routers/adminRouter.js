/**
 * @module adminRouter
 * @description
 * This module defines all administrative API routes for the application.
 * It handles CRUD operations and management features for multiple entities
 * within the system, all restricted to authenticated admin users.
 *
 * Protected by:
 * - `authenticateAdmin` middleware to ensure only authorized admins can access these routes.
 * - `controllerWrapper` to handle async errors consistently across all controllers.
 *
 * Features included:
 * - Admin authentication (login)
 * - Therapist management (create, read, update, delete, status changes, photo upload)
 * - Patient management (read, update status, delete)
 * - Affliction management (CRUD operations)
 * - Medic management (CRUD operations)
 * - Body region management (create, read, delete)
 * - Insurance organism management (CRUD operations)
 *
 * Notable implementations:
 * - Uses Multer with Cloudinary storage (`therapistPhotoStorage`) for handling therapist image uploads.
 * - Follows a RESTful structure with consistent and predictable endpoints.
 * - Separates concerns by delegating business logic to dedicated controllers.
 *
 * This router acts as the central entry point for all admin-related actions
 * in the system, ensuring a clean separation between admin operations and
 * other application layers.
 */

import { Router } from 'express';
import multer from 'multer';
import { therapistPhotoStorage } from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import { authenticateAdmin } from '../../middlewares/userAuthentication.js';
import afflictionController from '../controllers/afflictionController.js';
import authentificationController from '../controllers/authentificationController.js';
import insuranceController from '../controllers/insuranceController.js';
import medicController from '../controllers/medicController.js';
import patientController from '../controllers/patientController.js';
import therapistController from '../controllers/therapistController.js';

const uploadTherapistPhoto = multer({ storage: therapistPhotoStorage });

export const adminRouter = Router();

// Route to login an admin
adminRouter.post('/login', wrapper(authentificationController.loginAdmin));

// Route to get all therapists as admin
adminRouter.get(
  '/therapists',
  authenticateAdmin,
  wrapper(therapistController.getAllTherapistsAsAdmin)
);

// Route to get one therapist as admin
adminRouter.get(
  '/therapists/:therapist_id',
  authenticateAdmin,
  wrapper(therapistController.getOneTherapistAsAdmin)
);

// Route to create a new therapist as admin
adminRouter.post(
  '/therapists',
  authenticateAdmin,
  uploadTherapistPhoto.single('photo'),
  wrapper(therapistController.createTherapistAsAdmin)
);

// Route to update a therapist as admin
adminRouter.put(
  '/therapists/:therapist_id',
  authenticateAdmin,
  uploadTherapistPhoto.single('file'),
  wrapper(therapistController.updateTherapistAsAdmin)
);

// Route to toggle therapist status change as admin
adminRouter.put(
  '/therapists/:therapist_id/changeStatus',
  authenticateAdmin,
  wrapper(therapistController.changeTherapistStatusAsAdmin)
);

// Route to toggle therapist status as admin
adminRouter.patch(
  '/therapists/:therapist_id/toggleStatus',
  authenticateAdmin,
  wrapper(therapistController.toggleTherapistStatusAsAdmin)
);

// Route to delete a therapist as admin
adminRouter.delete(
  '/therapists/:therapist_id',
  authenticateAdmin,
  wrapper(therapistController.deleteTherapistAsAdmin)
);

// Route to get all patients as admin
adminRouter.get(
  '/allPatients',
  authenticateAdmin,
  wrapper(patientController.getAllPatientsAsAdmin)
);

// Route to get one patient as admin
adminRouter.get(
  '/patients/:patient_id',
  authenticateAdmin,
  wrapper(patientController.getOnePatientAsAdmin)
);

// Route to change patient status as admin
adminRouter.put(
  '/patients/:patient_id/changeStatus',
  authenticateAdmin,
  wrapper(patientController.changePatientStatusAsAdmin)
);

// Route to delete a patient as admin
adminRouter.delete(
  '/patients/:patient_id',
  authenticateAdmin,
  wrapper(patientController.deletePatientAsAdmin)
);

// Route to get all afflictions as admin
adminRouter.get(
  '/afflictions',
  authenticateAdmin,
  wrapper(afflictionController.getAllAfflictionsAsAdmin)
);

// Route to get one affliction as admin
adminRouter.get(
  '/afflictions/:affliction_id',
  authenticateAdmin,
  wrapper(afflictionController.getOneAfflictionAsAdmin)
);

// Route to create a new affliction as admin
adminRouter.post(
  '/afflictions',
  authenticateAdmin,
  wrapper(afflictionController.createAfflictionAsAdmin)
);

// Route to delete an affliction as admin
adminRouter.delete(
  '/afflictions/:affliction_id',
  authenticateAdmin,
  wrapper(afflictionController.deleteAfflictionAsAdmin)
);

// Route to update an affliction as admin
adminRouter.put(
  '/afflictions/:affliction_id',
  authenticateAdmin,
  wrapper(afflictionController.updateAfflictionAsAdmin)
);

// Route to get all medics as admin
adminRouter.get( 
  '/medics',
  authenticateAdmin,
  wrapper(medicController.getAllMedicsAsAdmin)
);

// Route to get one medic as admin
adminRouter.get(
  '/medics/:medic_id',
  authenticateAdmin,
  wrapper(medicController.getOneMedicAsAdmin)
);

// Route to create a new medic as admin
adminRouter.post(
  '/medics',
  authenticateAdmin,
  wrapper(medicController.createMedicAsAdmin)
);

// Route to update a medic as admin
adminRouter.put(
  '/medics/:medic_id',
  authenticateAdmin,
  wrapper(medicController.updateMedicAsAdmin)
);

// Route to delete a medic as admin
adminRouter.delete(
  '/medics/:medic_id',
  authenticateAdmin,
  wrapper(medicController.deleteMedicAsAdmin)
);

// Route to get all body regions
adminRouter.get(
  '/bodyRegions',
  authenticateAdmin,
  wrapper(afflictionController.getAllBodyRegions)
);

// Route to create a new body region
adminRouter.post(
  '/bodyRegions',
  authenticateAdmin,
  wrapper(afflictionController.createBodyRegion)
);

// Route to delete a body region
adminRouter.delete(
  '/bodyRegions/:body_region_id',
  authenticateAdmin,
  wrapper(afflictionController.deleteBodyRegion)
);

// Route to get all insurance organisms
adminRouter.get(
  '/insuranceOrganisms',
  authenticateAdmin,
  wrapper(insuranceController.getAllInsuranceOrganismsAsAdmin)
);

// Route to get one insurance organism
adminRouter.get(
  '/insuranceOrganisms/:insurance_id',
  authenticateAdmin,
  wrapper(insuranceController.getOneInsuranceOrganismAsAdmin)
);

// Route to create a new insurance organism
adminRouter.post(
  '/insuranceOrganisms',
  authenticateAdmin,
  wrapper(insuranceController.createInsuranceOrganismAsAdmin)
);

// Route to delete an insurance organism
adminRouter.delete(
  '/insuranceOrganisms/:insurance_id',
  authenticateAdmin,
  wrapper(insuranceController.deleteInsuranceOrganismAsAdmin)
);

// Route to update an insurance organism
adminRouter.put(
  '/insuranceOrganisms/:insurance_id',
  authenticateAdmin,
  wrapper(insuranceController.updateInsuranceOrganismAsAdmin)
);
