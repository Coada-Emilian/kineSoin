import changeTherapistStatusAsAdmin from '../../utils/therapist_controller_utils/admin_utils/changeTherapistStatusAsAdmin.js';
import createTherapistAsAdmin from '../../utils/therapist_controller_utils/admin_utils/createTherapistAsAdmin.js';
import deleteTherapistAsAdmin from '../../utils/therapist_controller_utils/admin_utils/deleteTherapistAsAdmin.js';
import getAllTherapistsAsAdmin from '../../utils/therapist_controller_utils/admin_utils/getAllTherapistsAsAdmin.js';
import getOneTherapistAsAdmin from '../../utils/therapist_controller_utils/admin_utils/getOneTherapistAsAdmin.js';
import toggleTherapistStatusAsAdmin from '../../utils/therapist_controller_utils/admin_utils/toggleTherapistStatusAsAdmin.js';
import updateTherapistAsAdmin from '../../utils/therapist_controller_utils/admin_utils/updateTherapistAsAdmin.js';
import getPersonalTherapistAsPatient from '../../utils/therapist_controller_utils/patient_utils/getPersonalTherapistAsPatient.js';
import deleteConnectedTherapist from '../../utils/therapist_controller_utils/therapist_utils/deleteConnectedTherapist.js';
import getAllTherapistsAsTherapist from '../../utils/therapist_controller_utils/therapist_utils/getAllTherapistsAsTherapist.js';
import getConnectedTherapistData from '../../utils/therapist_controller_utils/therapist_utils/getConnectedTherapistData.js';
import updateConnectedTherapist from '../../utils/therapist_controller_utils/therapist_utils/updateConnectedTherapist.js';
import uploadTherapistPhoto from '../../utils/therapist_controller_utils/therapist_utils/uploadTherapistPhoto.js';

const therapistController = {
  // Function to get a patient's personal therapist
  getPersonalTherapistAsPatient,

  // Function to get all therapists
  getAllTherapistsAsAdmin,

  // Function to get one therapist
  getOneTherapistAsAdmin,

  // Function to update a therapist by
  updateTherapistAsAdmin,

  // Function to delete a therapist
  deleteTherapistAsAdmin,

  // Function to create a therapist
  createTherapistAsAdmin,

  // Function to toggle therapist status
  changeTherapistStatusAsAdmin,

  // Function to toggle therapist status
  toggleTherapistStatusAsAdmin,

  // Get therapist's data
  getConnectedTherapistData,

  // Delete therapist
  deleteConnectedTherapist,

  // Update therapist's data
  updateConnectedTherapist,

  // Upload therapist's photo
  uploadTherapistPhoto,

  getAllTherapistsAsTherapist,
};

export default therapistController;
