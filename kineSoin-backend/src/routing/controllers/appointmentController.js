/**
 * @description Central controller export for appointment‑related operations.
 *
 * Rationale:
 * - Provides a single, predictable entry point for therapist‑side appointment logic,
 *   keeping routing clean and preventing scattered imports across the codebase.
 * - Groups related service functions into a cohesive API surface, making the
 *   appointment workflow easier to maintain and extend as new patient or therapist
 *   features are added.
 *
 * Notes:
 * - Focuses on therapist operations; patient‑side handlers are intentionally kept
 *   separate or commented out to avoid mixing responsibilities during development.
 */

import deleteAppointmentAsTherapist from '../../services/appointment/therapist/deleteAppointmentAsTherapist.js';
import getAllAppointmentsAsTherapist from '../../services/appointment/therapist/getAllAppointmentsAsTherapist.js';
import getPatientAppointmentsAsTherapist from '../../services/appointment/therapist/getPatientAppointmentsAsTherapist.js';
import getTherapistAppointmentDashboardData from '../../services/appointment/therapist/getTherapistAppointmentDashboardData.js';

const appointmentController = {
  // Function to delete an appointment as a therapist
  deleteAppointmentAsTherapist,

  // Get the therapist dashboard data consisting of existing appointments on the day
  getTherapistAppointmentDashboardData,

  // Get all appointments as a therapist
  getAllAppointmentsAsTherapist,

  // Get all appointments for a patient as a therapist
  getPatientAppointmentsAsTherapist,

  // // // Propose one appointment as a therapist
  // proposeOneAppointmentAsTherapist,

  // unused functions
  // // Function to get all appointments for a patient
  // getAllAppointmentsAsPatient,

  // // Function to get all appointments for a prescription as a patient
  // getAllAppointmentsForPrescriptionAsPatient,

  // // Get all proposed appointments for a patient
  // getAllProposedAppointmentsAsPatient,

  // // Get one proposed appointment for a patient
  // getOneProposedAppointmentAsPatient,

  // // Accept one proposed appointment for a patient
  // acceptOneProposedAppointmentAsPatient,

  // // Get one appointment for a patient
  // getOneAppointmentAsPatient,

  // // Cancel one appointment for a patient
  // cancelOneAppointmentAsPatient,

  // // Decrement the completed appointment quantity as a therapist
  // decrementCompletedAppointmentQuantityAsTherapist,

  // // Decrement the prescription appointment quantity as a therapist
  // // decrementPrescriptionAppointmentQuantityAsTherapist,

  // // Increment the completed appointment quantity as a therapist
  // incrementCompletedAppointmentQuantityAsTherapist,

  // // Increment the prescription appointment quantity as a therapist
  // // incrementPrescriptionAppointmentQuantityAsTherapist,
};

export default appointmentController;
