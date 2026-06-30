import getAllBodyRegionsService from '../../../../services/body_region/admin/getAllBodyRegionsAsAdmin.js';

export default async function getAllBodyRegionsAsAdmin(req, res) {
  try {
    const body_regions = await getAllBodyRegionsService({
      adminId: req.admin_id,
    });

    if (body_regions.length === 0) {
      return res.status(404).json({ message: 'No body regions found.' });
    }

    return res.status(200).json(body_regions);
  } catch (error) {
    console.error('Error fetching body regions:', error);

    return res.status(500).json({
      message: 'Error fetching body regions:',
      error: error.message,
    });
  }
}
