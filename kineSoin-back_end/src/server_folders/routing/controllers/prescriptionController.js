// Purpose: Define the prescription controller, which contains the methods for getting all prescriptions, getting one prescription, and adding a new prescription.

import addNewPrescription from '../../utils/prescription_controller_utils/patient_utils/addNewPrescription.js';
import getAllPrescriptionsAsPatient from '../../utils/prescription_controller_utils/patient_utils/getAllPrescriptionsAsPatient.js';
import getOnePrescription from '../../utils/prescription_controller_utils/patient_utils/getOnePrescription.js';

const prescriptionController = {
  // Function to get all prescriptions for a patient
  getAllPrescriptionsAsPatient,

  // Function to add a new prescription by a patient
  addNewPrescription,

  // Get one prescription
  getOnePrescription,
};

export default prescriptionController;
