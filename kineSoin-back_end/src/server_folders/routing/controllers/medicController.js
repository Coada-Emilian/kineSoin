// Purpose: to handle requests from the medic routes and send responses back to the client.

import createMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/createMedicAsAdmin.js';
import deleteMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/deleteMedicAsAdmin.js';
import getAllMedicsAsAdmin from '../../utils/medic_controller_utils/admin_utils/getAllMedicsAsAdmin.js';
import getOneMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/getOneMedicAsAdmin.js';
import updateMedicAsAdmin from '../../utils/medic_controller_utils/admin_utils/updateMedicAsAdmin.js';
import getMedicNamesAsPatient from '../../utils/medic_controller_utils/patient_utils/getMedicNamesAsPatient.js';

const medicController = {
  // Function to get all medics
  getAllMedicsAsAdmin,

  // Function to get one medic
  getOneMedicAsAdmin,

  // Function to create a medic
  createMedicAsAdmin,

  // Function to update a medic
  updateMedicAsAdmin,

  // Function to delete a medic
  deleteMedicAsAdmin,

  getMedicNamesAsPatient,
};

export default medicController;
