import getAllMedicsService from '../../../../services/medic/admin/getAllMedicsAsAdmin.js';

export default async function getAllMedicsAsAdmin(req, res) {
  try {
    const medics = await getAllMedicsService({ adminId: req.admin_id });

    if (medics.length === 0) {
      return res.status(404).json({ message: 'No medics found.' });
    }
    return res.status(200).json(medics);
  } catch (error) {
    console.error('Error fetching medics:', error);

    return res.status(500).json({
      message: 'Error fetching medics:',
      error: error.message,
    });
  }
}
