import deleteBodyRegionService from '../../../../services/body_region/admin/deleteBodyRegionAsAdmin.js';

export default async function deleteBodyRegionAsAdmin(req, res) {
  try {
    await deleteBodyRegionService({
      adminId: req.admin_id,
      bodyRegionId: req.params.body_region_id,
    });

    return res
      .status(200)
      .json({ message: 'Body region deleted successfully.' });
  } catch (error) {
    console.error('Error deleting body region:', error);

    return res.status(500).json({
      message: 'Error deleting body region:',
      error: error.message,
    });
  }
}
