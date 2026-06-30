import getAllAfflictionsService from '../../../../services/affliction/admin/getAllAfflictionsAsAdmin.js';

export default async function getAllAfflictionsAsAdmin(req, res) {
  try {
    const afflictions = await getAllAfflictionsService({
      adminId: req.admin_id,
    });

    if (afflictions.length === 0) {
      return res.status(404).json({ message: 'No afflictions found.' });
    }
    return res.status(200).json(afflictions);
  } catch (error) {
    console.error('Error fetching afflictions:', error);

    return res.status(500).json({
      message: 'Error fetching afflictions:',
      error: error.message,
    });
  }
}
