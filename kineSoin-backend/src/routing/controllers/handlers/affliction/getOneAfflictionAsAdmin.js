import getOneAfflictionService from '../../../../services/affliction/admin/getOneAfflictionAsAdmin.js';

export default async function getOneAfflictionAsAdmin(req, res) {
  try {
    const affliction = await getOneAfflictionService({
      adminId: req.admin_id,
      afflictionId: req.params.affliction_id,
    });

    if (!affliction) {
      return res.status(404).json({ message: 'Affliction not found.' });
    }

    return res.status(200).json(affliction);
  } catch (error) {
    console.error('Error fetching affliction:', error);

    return res.status(500).json({
      message: 'Error fetching affliction:',
      error: error.message,
    });
  }
}
