/**
 * @description Defines the admin router, which contains the routes that are accessible to administrators.
 *
 * This module:
 * - Imports the Router class from the express module to create a new router.
 * - Imports the authenticateAdmin middleware to authenticate admin users.
 * - Imports the therapistPhotoStorage configuration from the cloudinary module.
 * - Imports the controllerWrapper middleware to wrap controller functions and catch errors.
 * - Imports the multer module to handle file uploads.
 * - Imports controller modules for handling various entities: patientController, therapistController, authentificationController, afflictionController, medicController, and insuranceController.
 * - Configures multer to use the therapistPhotoStorage for storing uploaded therapist photos.
 * - Creates a new router instance using Router().
 *
 * The admin router defines the following routes:
 * - POST /login: Logs in an admin.
 *   - Wraps the loginAdmin controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /therapists: Retrieves all therapists.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the getAllTherapists controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /therapists/:therapist_id: Retrieves a specific therapist.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the getOneTherapist controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /therapists: Creates a new therapist.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Uses multer middleware to handle photo uploads (single file) with storage configuration.
 *   - Wraps the createTherapist controller function with the controllerWrapper to catch and handle errors.
 *
 * - PUT /therapists/:therapist_id: Updates a specific therapist.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Uses multer middleware to handle photo uploads (single file) with storage configuration.
 *   - Wraps the updateTherapist controller function with the controllerWrapper to catch and handle errors.
 *
 * - PUT /therapists/:therapist_id/toggleStatus: Toggles the status of a specific therapist.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the toggleTherapistStatus controller function with the controllerWrapper to catch and handle errors.
 *
 * - DELETE /therapists/:therapist_id: Deletes a specific therapist.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the deleteTherapist controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /allPatients: Retrieves all patients.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the getAllPatients controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /patients/:patient_id: Retrieves a specific patient.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the getOnePatient controller function with the controllerWrapper to catch and handle errors.
 *
 * - PUT /patients/:patient_id: Toggles the status of a specific patient.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the togglePatientStatus controller function with the controllerWrapper to catch and handle errors.
 *
 * - DELETE /patients/:patient_id: Deletes a specific patient.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the deletePatient controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /afflictions: Retrieves all afflictions.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the getAllAfflictions controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /afflictions/:affliction_id: Retrieves a specific affliction.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the getOneAffliction controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /afflictions: Creates a new affliction.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the createAffliction controller function with the controllerWrapper to catch and handle errors.
 *
 * - DELETE /afflictions/:affliction_id: Deletes a specific affliction.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the deleteAffliction controller function with the controllerWrapper to catch and handle errors.
 *
 * - PUT /afflictions/:affliction_id: Updates a specific affliction.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the updateAffliction controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /medics: Retrieves all medics.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the getAllMedics controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /medics/:medic_id: Retrieves a specific medic.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the getOneMedic controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /medics: Creates a new medic.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the createMedic controller function with the controllerWrapper to catch and handle errors.
 *
 * - PUT /medics/:medic_id: Updates a specific medic.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the updateMedic controller function with the controllerWrapper to catch and handle errors.
 *
 * - DELETE /medics/:medic_id: Deletes a specific medic.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the deleteMedic controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /bodyRegions: Retrieves all body regions.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the getAllBodyRegions controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /bodyRegions: Creates a new body region.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the createBodyRegion controller function with the controllerWrapper to catch and handle errors.
 *
 * - DELETE /bodyRegions/:body_region_id: Deletes a specific body region.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the deleteBodyRegion controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /insuranceOrganisms: Retrieves all insurance organisms.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the getAllInsuranceOrganisms controller function with the controllerWrapper to catch and handle errors.
 *
 * - GET /insuranceOrganisms/:insurance_id: Retrieves a specific insurance organism.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the getOneInsuranceOrganism controller function with the controllerWrapper to catch and handle errors.
 *
 * - POST /insuranceOrganisms: Creates a new insurance organism.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the createInsuranceOrganism controller function with the controllerWrapper to catch and handle errors.
 *
 * - DELETE /insuranceOrganisms/:insurance_id: Deletes a specific insurance organism.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the deleteInsuranceOrganism controller function with the controllerWrapper to catch and handle errors.
 *
 * - PUT /insuranceOrganisms/:insurance_id: Updates a specific insurance organism.
 *   - Uses authenticateAdmin middleware to authenticate admin users.
 *   - Wraps the updateInsuranceOrganism controller function with the controllerWrapper to catch and handle errors.
 *
 * Ensure that the express, multer, authenticateAdmin, controllerWrapper, patientController, therapistController, authentificationController, afflictionController, medicController, and insuranceController modules are installed and properly configured before using this setup.
 */

import { Router } from 'express';
import { authenticateAdmin } from '../../middlewares/userAuthentication.js';
import { therapistPhotoStorage } from '../../cloudinary/index.js';
import { controllerWrapper as wrapper } from '../../middlewares/controllerWrapper.js';
import multer from 'multer';
import patientController from '../controllers/patientController.js';
import therapistController from '../controllers/therapistController.js';
import authentificationController from '../controllers/authentificationController.js';
import afflictionController from '../controllers/afflictionController.js';
import medicController from '../controllers/medicController.js';
import insuranceController from '../controllers/insuranceController.js';

const uploadTherapistPhoto = multer({ storage: therapistPhotoStorage });

export const adminRouter = Router();

// Route to login an admin
adminRouter.post('/login', wrapper(authentificationController.loginAdmin));

// Route to get all therapists
adminRouter.get(
  '/therapists',
  authenticateAdmin,
  wrapper(therapistController.getAllTherapists)
);

// Route to get one therapist
adminRouter.get(
  '/therapists/:therapist_id',
  authenticateAdmin,
  wrapper(therapistController.getOneTherapist)
);

// Route to create a new therapist
adminRouter.post(
  '/therapists',
  authenticateAdmin,
  uploadTherapistPhoto.single('photo'),
  wrapper(therapistController.createTherapist)
);

// Route to update a therapist
adminRouter.put(
  '/therapists/:therapist_id',
  authenticateAdmin,
  uploadTherapistPhoto.single('file'),
  wrapper(therapistController.updateTherapist)
);

// Route to toggle therapist status change
adminRouter.put(
  '/therapists/:therapist_id/toggleStatus',
  authenticateAdmin,
  wrapper(therapistController.toggleTherapistStatus)
);

// Route to delete a therapist
adminRouter.delete(
  '/therapists/:therapist_id',
  authenticateAdmin,
  wrapper(therapistController.deleteTherapist)
);

// Route to get all patients
adminRouter.get(
  '/allPatients',
  authenticateAdmin,
  wrapper(patientController.getAllPatients)
);

// Route to get one patient
adminRouter.get(
  '/patients/:patient_id',
  authenticateAdmin,
  wrapper(patientController.getOnePatient)
);

// Route to toggle patient status change
adminRouter.put(
  '/patients/:patient_id',
  authenticateAdmin,
  wrapper(patientController.togglePatientStatus)
);

// Route to delete a patient
adminRouter.delete(
  '/patients/:patient_id',
  authenticateAdmin,
  wrapper(patientController.deletePatient)
);

// Route to get all afflictions
adminRouter.get(
  '/afflictions',
  authenticateAdmin,
  wrapper(afflictionController.getAllAfflictions)
);

// Route to get one affliction
adminRouter.get(
  '/afflictions/:affliction_id',
  authenticateAdmin,
  wrapper(afflictionController.getOneAffliction)
);

// Route to create a new affliction
adminRouter.post(
  '/afflictions',
  authenticateAdmin,
  wrapper(afflictionController.createAffliction)
);

// Route to delete an affliction
adminRouter.delete(
  '/afflictions/:affliction_id',
  authenticateAdmin,
  wrapper(afflictionController.deleteAffliction)
);

// Route to update an affliction
adminRouter.put(
  '/afflictions/:affliction_id',
  authenticateAdmin,
  wrapper(afflictionController.updateAffliction)
);

// Route to get all medics
adminRouter.get(
  '/medics',
  authenticateAdmin,
  wrapper(medicController.getAllMedics)
);

// Route to get one medic
adminRouter.get(
  '/medics/:medic_id',
  authenticateAdmin,
  wrapper(medicController.getOneMedic)
);

// Route to create a new medic
adminRouter.post(
  '/medics',
  authenticateAdmin,
  wrapper(medicController.createMedic)
);

// Route to update a medic
adminRouter.put(
  '/medics/:medic_id',
  authenticateAdmin,
  wrapper(medicController.updateMedic)
);

// Route to delete a medic
adminRouter.delete(
  '/medics/:medic_id',
  authenticateAdmin,
  wrapper(medicController.deleteMedic)
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
  wrapper(insuranceController.getAllInsuranceOrganisms)
);

// Route to get one insurance organism
adminRouter.get(
  '/insuranceOrganisms/:insurance_id',
  authenticateAdmin,
  wrapper(insuranceController.getOneInsuranceOrganism)
);

// Route to create a new insurance organism
adminRouter.post(
  '/insuranceOrganisms',
  authenticateAdmin,
  wrapper(insuranceController.createInsuranceOrganism)
);

// Route to delete an insurance organism
adminRouter.delete(
  '/insuranceOrganisms/:insurance_id',
  authenticateAdmin,
  wrapper(insuranceController.deleteInsuranceOrganism)
);

// Route to update an insurance organism
adminRouter.put(
  '/insuranceOrganisms/:insurance_id',
  authenticateAdmin,
  wrapper(insuranceController.updateInsuranceOrganism)
);
