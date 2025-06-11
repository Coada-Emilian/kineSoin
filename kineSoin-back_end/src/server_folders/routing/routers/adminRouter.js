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

// Route to get all therapists
adminRouter.get(
  '/therapists',
  authenticateAdmin,
  wrapper(therapistController.getAllTherapistsAsAdmin)
);

// Route to get one therapist
adminRouter.get(
  '/therapists/:therapist_id',
  authenticateAdmin,
  wrapper(therapistController.getOneTherapistAsAdmin)
);

// Route to create a new therapist
adminRouter.post(
  '/therapists',
  authenticateAdmin,
  uploadTherapistPhoto.single('photo'),
  wrapper(therapistController.createTherapistAsAdmin)
);

// Route to update a therapist
adminRouter.put(
  '/therapists/:therapist_id',
  authenticateAdmin,
  uploadTherapistPhoto.single('file'),
  wrapper(therapistController.updateTherapistAsAdmin)
);

// Route to toggle therapist status change
adminRouter.put(
  '/therapists/:therapist_id/changeStatus',
  authenticateAdmin,
  wrapper(therapistController.changeTherapistStatusAsAdmin)
);

// Route to toggle therapist status
adminRouter.patch(
  '/therapists/:therapist_id/toggleStatus',
  authenticateAdmin,
  wrapper(therapistController.toggleTherapistStatusAsAdmin)
);

// Route to delete a therapist
adminRouter.delete(
  '/therapists/:therapist_id',
  authenticateAdmin,
  wrapper(therapistController.deleteTherapistAsAdmin)
);

// Route to get all patients
adminRouter.get(
  '/allPatients',
  authenticateAdmin,
  wrapper(patientController.getAllPatientsAsAdmin)
);

// Route to get one patient
adminRouter.get(
  '/patients/:patient_id',
  authenticateAdmin,
  wrapper(patientController.getOnePatientAsAdmin)
);

// Route to change patient status
adminRouter.put(
  '/patients/:patient_id/changeStatus',
  authenticateAdmin,
  wrapper(patientController.changePatientStatusAsAdmin)
);

// Route to delete a patient
adminRouter.delete(
  '/patients/:patient_id',
  authenticateAdmin,
  wrapper(patientController.deletePatientAsAdmin)
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
  wrapper(medicController.getAllMedicsAsAdmin)
);

// Route to get one medic
adminRouter.get(
  '/medics/:medic_id',
  authenticateAdmin,
  wrapper(medicController.getOneMedicAsAdmin)
);

// Route to create a new medic
adminRouter.post(
  '/medics',
  authenticateAdmin,
  wrapper(medicController.createMedicAsAdmin)
);

// Route to update a medic
adminRouter.put(
  '/medics/:medic_id',
  authenticateAdmin,
  wrapper(medicController.updateMedicAsAdmin)
);

// Route to delete a medic
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
