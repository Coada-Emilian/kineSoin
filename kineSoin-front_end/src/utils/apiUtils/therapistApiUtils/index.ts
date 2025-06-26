import { cancelAppointmentAsTherapist } from './appointmentApiUtils/cancelAppointmentAsTherapist';
import { fetchTherapistDashboardData } from './fetchTherapistDashboardData';
import { sendMessageToPatient } from './messageApiUtils/sendMessageToPatient';
import { fetchPatientDataAsTherapist } from './patientApiUtils/fetchPatientDataAsTherapist';
import { fetchPatientsAsTherapist } from './patientApiUtils/fetchPatientsAsTherapist';
import { togglePatientStatusAsTherapist } from './patientApiUtils/togglePatientStatusAsTherapist';
import { reduceAppointmentQuantity } from './prescriptionApiUtils/reduceAppointmentQuantity';

export {
  cancelAppointmentAsTherapist,
  fetchPatientDataAsTherapist,
  fetchPatientsAsTherapist,
  fetchTherapistDashboardData,
  reduceAppointmentQuantity,
  sendMessageToPatient,
  togglePatientStatusAsTherapist,
};
