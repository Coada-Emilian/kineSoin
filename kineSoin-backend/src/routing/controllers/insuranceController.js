/**
 * @description Central controller export for insurance‑related operations.
 *
 * Rationale:
 * - Provides a single, predictable entry point for all insurance management logic,
 *   keeping routing clean and preventing scattered imports across the codebase.
 * - Separates admin‑level organism management from patient‑side insurance handling,
 *   making the controller surface easier to maintain and extend.
 *
 * Notes:
 * - Delegates actual business logic to role‑specific service modules, keeping this
 *   controller lightweight and focused on structure rather than implementation.
 */

import createInsuranceOrganismAsAdmin from './handlers/insurance/admin/createInsuranceAsAdmin.js';
import deleteInsuranceOrganismAsAdmin from './handlers/insurance/admin/deleteInsuranceAsAdmin.js';
import getAllInsuranceOrganismsAsAdmin from './handlers/insurance/admin/getAllInsurancesAsAdmin.js';
import getOneInsuranceOrganismAsAdmin from './handlers/insurance/admin/getOneInsuranceAsAdmin.js';
import updateInsuranceOrganismAsAdmin from './handlers/insurance/admin/updateInsuranceAsAdmin.js';

const insuranceController = {
  // Function to get all insurance organisms as admin
  getAllInsuranceOrganismsAsAdmin,

  // Function to get one insurance organism as admin
  getOneInsuranceOrganismAsAdmin,

  // Function to delete an insurance organism as admin
  deleteInsuranceOrganismAsAdmin,

  // Function to create an insurance organism as admin
  createInsuranceOrganismAsAdmin,

  // Function to update an insurance organism as admin
  updateInsuranceOrganismAsAdmin,

  // // Function to get all insurances for a patient
  // getInsurancesAsPatient,

  // // Function to update an insurance for a patient
  // updateInsuranceAsPatient,

  // // Function to add an insurance to a patient
  // addInsuranceAsPatient,
};

export default insuranceController;
