// Purpose: to handle requests from the medic routes and send responses back to the client.

import createMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/createMedicAsAdmin.js';
import deleteMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/deleteMedicAsAdmin.js';
import getAllMedicsAsAdmin from '../../utils/medic_controller_utils/admin_utils/getAllMedicsAsAdmin.js';
import getOneMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/getOneMedicAsAdmin.js';
import updateMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/updateMedicAsAdmin.js';
import getMedicNamesAsPatient from '../../utils/medic_controller_utils/patient_utils/getMedicNamesAsPatient.js';

const medicController = {
  // Function to get all medics as admin
  getAllMedicsAsAdmin,

  // Function to get one medic as admin
  getOneMedicAsAdmin,

  // Function to create a medic as admin
  createMedicAsAdmin,

  // Function to update a medic as admin
  updateMedicAsAdmin,

  // Function to delete a medic as admin
  deleteMedicAsAdmin,

  // Function to get medic names as patient
  getMedicNamesAsPatient,
};

export default medicController;
