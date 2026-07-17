/**
 * @description Central controller export for prescription‑related operations.
 *
 * Rationale:
 * - Provides a single, predictable entry point for all prescription logic,
 *   keeping routing clean and preventing scattered imports across the codebase.
 * - Keeps therapist and patient responsibilities clearly separated while leaving
 *   room for future expansion of prescription workflows.
 *
 * Notes:
 * - Currently exposes no active handlers; commented‑out methods remain as a
 *   roadmap for upcoming patient and therapist features.
 */

import getPrescriptionDetailsAsTherapist from './handlers/prescription/therapist/getPrescriptionDetailsAsTherapist.js';
import incrementPrescriptionAppointmentQuantityAsTherapist from './handlers/prescription/therapist/incrementPrescriptionAppointmentQuantityAsTherapist.js';

const prescriptionController = {
  // // Increment the prescription appointment quantity as a therapist
  incrementPrescriptionAppointmentQuantityAsTherapist,

  getPrescriptionDetailsAsTherapist,
  // // Function to get all prescriptions for a patient
  // getAllPrescriptionsAsPatient,
  // // Function to add a new prescription by a patient
  // addNewPrescription,
  // // Get one prescription
  // getOnePrescription,
  // getPatientPrescriptionsAsTherapist,
};

export default prescriptionController;
