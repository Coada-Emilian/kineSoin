import deleteAfflictionService from '../../../../services/affliction/admin/deleteAfflictionAsAdmin.js';

export default async function deleteAfflictionAsAdmin(req, res) {
  try {
    await deleteAfflictionService({
      adminId: req.admin_id,
      afflictionId: req.params.affliction_id,
    });

    return res.status(200).json({
      message: 'Affliction deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting affliction:', error);

    return res.status(500).json({
      message: 'Error deleting affliction:',
      error: error.message,
    });
  }
}
