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

  // Function to get all therapists as admin
  getAllTherapistsAsAdmin,

  // Function to get one therapist as admin
  getOneTherapistAsAdmin,

  // Function to update a therapist as admin
  updateTherapistAsAdmin,

  // Function to delete a therapist as admin
  deleteTherapistAsAdmin,

  // Function to create a therapist as admin
  createTherapistAsAdmin,

  // Function to toggle therapist status as admin
  changeTherapistStatusAsAdmin,

  // Function to toggle therapist status as admin
  toggleTherapistStatusAsAdmin,

  // Get therapist's data
  getConnectedTherapistData,

  // Delete therapist
  deleteConnectedTherapist,

  // Update therapist's data
  updateConnectedTherapist,

  // Upload therapist's photo
  uploadTherapistPhoto,

  // Function to get all therapists as therapist
  getAllTherapistsAsTherapist,
};

export default therapistController;
