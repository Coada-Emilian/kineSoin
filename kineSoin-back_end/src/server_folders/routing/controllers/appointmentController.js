/**
 * @module appointmentController
 * @description
 * This controller centralizes all appointment-related operations for both patients and therapists.
 *
 * Patient-related methods include:
 * - Fetching all appointments
 * - Fetching all appointments for a specific prescription
 * - Fetching proposed appointments (all or single)
 * - Accepting a proposed appointment
 * - Getting details of a single appointment
 * - Canceling an appointment
 *
 * Therapist-related methods include:
 * - Proposing new appointments
 * - Fetching all appointments
 * - Deleting appointments
 * - Incrementing and decrementing completed appointment quantities
 * - Incrementing and decrementing prescription appointment quantities
 *
 * Each function handles specific business logic related to appointments,
 * validating input and managing data consistency between prescriptions, patients, and therapists.
 */

import deleteAppointmentAsTherapist from '../../utils/appointment_controller_utils/therapist_utils/deleteAppointmentAsTherapist.js';
import getAllAppointmentsAsTherapist from '../../utils/appointment_controller_utils/therapist_utils/getAllAppointmentsAsTherapist.js';
import getPatientAppointmentsAsTherapist from '../../utils/appointment_controller_utils/therapist_utils/getPatientAppointmentsAsTherapist.js';
import getTherapistAppointmentDashboardData from '../../utils/appointment_controller_utils/therapist_utils/getTherapistAppointmentDashboardData.js';
import proposeOneAppointmentAsTherapist from '../../utils/appointment_controller_utils/therapist_utils/proposeOneAppointmentAsTherapist.js';

const appointmentController = {
  // Function to delete an appointment as a therapist
  deleteAppointmentAsTherapist,

  // Get the therapist dashboard data consisting of existing appointments on the day
  getTherapistAppointmentDashboardData,

  // Get all appointments as a therapist
  getAllAppointmentsAsTherapist,

  // Get all appointments for a patient as a therapist
  getPatientAppointmentsAsTherapist,

  // // Propose one appointment as a therapist
  proposeOneAppointmentAsTherapist,

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
