import createBodyRegionAsAdmin from '../../utils/affliction_controller_utils/body_region_utils/createBodyRegionAsAdmin.js';
import deleteBodyRegionAsAdmin from '../../utils/affliction_controller_utils/body_region_utils/deleteBodyRegionAsAdmin.js';
import getAllBodyRegionsAsAdmin from '../../utils/affliction_controller_utils/body_region_utils/getAllBodyRegionsAsAdmin.js';
import createAfflictionAsAdmin from '../../utils/affliction_controller_utils/createAfflictionAsAdmin.js';
import deleteAfflictionAsAdmin from '../../utils/affliction_controller_utils/deleteAfflictionAsAdmin.js';
import getAfflictionNamesAsPatient from '../../utils/affliction_controller_utils/getAfflictionNamesAsPatient.js';
import getAllAfflictionsAsAdmin from '../../utils/affliction_controller_utils/getAllAfflictionsAsAdmin.js';
import getOneAfflictionAsAdmin from '../../utils/affliction_controller_utils/getOneAfflictionAsAdmin.js';
import updateAfflictionAsAdmin from '../../utils/affliction_controller_utils/updateAfflictionAsAdmin.js';

const afflictionController = {
  // Function to get all afflictions as admin
  getAllAfflictionsAsAdmin,

  // Function to get one affliction as admin
  getOneAfflictionAsAdmin,

  // Function to create a new affliction as admin
  createAfflictionAsAdmin,

  // Function to update an affliction as admin
  updateAfflictionAsAdmin,

  // Function to delete an affliction as admin
  deleteAfflictionAsAdmin,

  // Function to get all body regions as admin
  getAllBodyRegionsAsAdmin,

  // Function to create a new body region as admin
  createBodyRegionAsAdmin,

  // Function to delete one body region
  deleteBodyRegionAsAdmin,

  // Function to get affliction names as a patient
  getAfflictionNamesAsPatient,
};

export default afflictionController;
