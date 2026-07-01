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

const prescriptionController = {
  // // Function to get all prescriptions for a patient
  // getAllPrescriptionsAsPatient,

  // // Function to add a new prescription by a patient
  // addNewPrescription,

  // // Get one prescription
  // getOnePrescription,

  // getPatientPrescriptionsAsTherapist,
};

export default prescriptionController;
