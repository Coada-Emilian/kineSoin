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

import acceptOneProposedAppointmentAsPatient from '../../utils/appointment_controller_utils/patient_utils/acceptOneProposedAppointmentAsPatient.js';
import cancelOneAppointmentAsPatient from '../../utils/appointment_controller_utils/patient_utils/cancelOneAppointmentAsPatient.js';
import getAllAppointmentsAsPatient from '../../utils/appointment_controller_utils/patient_utils/getAllAppointmentsAsPatient.js';
import getAllAppointmentsForPrescriptionAsPatient from '../../utils/appointment_controller_utils/patient_utils/getAllAppointmentsForPrescriptionAsPatient.js';
import getAllProposedAppointmentsAsPatient from '../../utils/appointment_controller_utils/patient_utils/getAllProposedAppointmentsAsPatient.js';
import getOneAppointmentAsPatient from '../../utils/appointment_controller_utils/patient_utils/getOneAppointmentAsPatient.js';
import getOneProposedAppointmentAsPatient from '../../utils/appointment_controller_utils/patient_utils/getOneProposedAppointmentAsPatient.js';
import decrementCompletedAppointmentQuantityAsTherapist from '../../utils/appointment_controller_utils/therapist_utils/decrementCompletedAppointmentQuantityAsTherapist.js';
import decrementPrescriptionAppointmentQuantityAsTherapist from '../../utils/appointment_controller_utils/therapist_utils/decrementPrescriptionAppointmentQuantityAsTherapist.js';
import deleteAppointmentAsTherapist from '../../utils/appointment_controller_utils/therapist_utils/deleteAppointmentAsTherapist.js';
import getAllAppointmentAsTherapist from '../../utils/appointment_controller_utils/therapist_utils/getAllAppointmentsAsTherapist.js';
import getTherapistDashboardData from '../../utils/appointment_controller_utils/therapist_utils/getTherapistDashboardData.js';
import incrementCompletedAppointmentQuantityAsTherapist from '../../utils/appointment_controller_utils/therapist_utils/incrementCompletedAppointmentQuantityAsTherapist.js';
import incrementPrescriptionAppointmentQuantityAsTherapist from '../../utils/appointment_controller_utils/therapist_utils/incrementPrescriptionAppointmentQuantityAsTherapist.js';
import proposeOneAppointmentAsTherapist from '../../utils/appointment_controller_utils/therapist_utils/proposeOneAppointmentAsTherapist.js';

const appointmentController = {
  // Function to get all appointments for a patient
  getAllAppointmentsAsPatient,

  // Function to get all appointments for a prescription as a patient
  getAllAppointmentsForPrescriptionAsPatient,

  // Get all proposed appointments for a patient
  getAllProposedAppointmentsAsPatient,

  // Get one proposed appointment for a patient
  getOneProposedAppointmentAsPatient,

  // Accept one proposed appointment for a patient
  acceptOneProposedAppointmentAsPatient,

  // Get one appointment for a patient
  getOneAppointmentAsPatient,

  // Cancel one appointment for a patient
  cancelOneAppointmentAsPatient,

  // Function to delete an appointment as a therapist
  deleteAppointmentAsTherapist,

  // Propose one appointment as a therapist
  proposeOneAppointmentAsTherapist,

  //  Get all appointments for a therapist
  getAllAppointmentAsTherapist,

  // Decrement the completed appointment quantity as a therapist
  decrementCompletedAppointmentQuantityAsTherapist,

  // Decrement the prescription appointment quantity as a therapist
  decrementPrescriptionAppointmentQuantityAsTherapist,

  // Increment the completed appointment quantity as a therapist
  incrementCompletedAppointmentQuantityAsTherapist,

  // Increment the prescription appointment quantity as a therapist
  incrementPrescriptionAppointmentQuantityAsTherapist,

  getTherapistDashboardData,
};

export default appointmentController;
