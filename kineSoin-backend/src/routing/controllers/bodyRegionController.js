import {
  createBodyRegionAsAdmin,
  deleteBodyRegionAsAdmin,
  getAllBodyRegionsAsAdmin,
} from './handlers/bodyRegion/admin/index.js';

const bodyRegionController = {
  // Function to get all body regions as admin
  getAllBodyRegionsAsAdmin,

  // Function to create a new body region as admin
  createBodyRegionAsAdmin,

  // Function to delete one body region as admin
  deleteBodyRegionAsAdmin,
};

export default bodyRegionController;
