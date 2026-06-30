import getOneMedicService from '../../../../services/medic/admin/getOneMedicAsAdmin.js';

export default async function getOneMedicAsAdmin(req, res) {
  try {
    const foundMedic = await getOneMedicService({
      adminId: req.admin_id,
      medicId: req.params.medic_id,
    });

    if (!foundMedic) {
      return res.status(404).json({ message: 'No medic found.' });
    }
    return res.status(200).json(foundMedic);
  } catch (error) {
    console.error('Error fetching medic:', error);

    return res.status(500).json({
      message: 'Error fetching medic:',
      error: error.message,
    });
  }
}
