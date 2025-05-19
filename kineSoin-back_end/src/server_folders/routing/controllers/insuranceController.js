/**
 * @module insuranceController
 * @description
 * Centralizes all logic related to insurance management for both patients and administrators.
 *
 * For Patients:
 * - `getInsurancesAsPatient`: Retrieve all insurance records linked to a specific patient.
 * - `updateInsuranceAsPatient`: Update an existing insurance entry for the logged-in patient.
 * - `addInsuranceAsPatient`: Add a new insurance entry to the logged-in patient's profile.
 *
 * For Administrators:
 * - `getAllInsuranceOrganismsAsAdmin`: Retrieve a list of all registered insurance organisms.
 * - `getOneInsuranceOrganismAsAdmin`: Retrieve detailed information on a specific insurance organism.
 * - `createInsuranceOrganismAsAdmin`: Add a new insurance organism to the system.
 * - `updateInsuranceOrganismAsAdmin`: Modify an existing insurance organism’s details.
 * - `deleteInsuranceOrganismAsAdmin`: Remove an insurance organism from the system.
 *
 * This controller serves as the interface for routing insurance-related API calls
 * to their respective utility functions.
 */

import createInsuranceOrganismAsAdmin from '../../utils/insurance_controller_utils/admin_utils/createInsuranceOrganismAsAdmin.js';
import deleteInsuranceOrganismAsAdmin from '../../utils/insurance_controller_utils/admin_utils/deleteInsuranceOrganismAsAdmin.js';
import getAllInsuranceOrganismsAsAdmin from '../../utils/insurance_controller_utils/admin_utils/getAllInsuranceOrganismsAsAdmin.js';
import getOneInsuranceOrganismAsAdmin from '../../utils/insurance_controller_utils/admin_utils/getOneInsuranceOrganismAsAdmin.js';
import updateInsuranceOrganismAsAdmin from '../../utils/insurance_controller_utils/admin_utils/updateInsuranceOrganismAsAdmin.js';
import addInsuranceAsPatient from '../../utils/insurance_controller_utils/patient_utils/addInsuranceAsPAtient.js';
import getInsurancesAsPatient from '../../utils/insurance_controller_utils/patient_utils/getInsurancesAsPatient.js';
import updateInsuranceAsPatient from '../../utils/insurance_controller_utils/patient_utils/updateInsuranceAsPatient.js';

const insuranceController = {
  // Function to get all insurances for a patient
  getInsurancesAsPatient,
  // Function to update an insurance for a patient
  updateInsuranceAsPatient,
  // Function to add an insurance to a patient
  addInsuranceAsPatient,

  // Function to get all insurance organisms
  getAllInsuranceOrganismsAsAdmin,

  // Function to delete an insurance organism
  deleteInsuranceOrganismAsAdmin,

  // Function to create an insurance organism
  createInsuranceOrganismAsAdmin,

  // Function to get one insurance organism
  getOneInsuranceOrganismAsAdmin,

  // Function to update an insurance organism
  updateInsuranceOrganismAsAdmin,
};

export default insuranceController;
