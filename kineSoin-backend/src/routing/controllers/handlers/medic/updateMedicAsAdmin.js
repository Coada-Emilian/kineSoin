import updateMedicService from '../../../../services/medic/admin/updateMedicAsAdmin.js';

export default async function updateMedicAsAdmin(req, res) {
  try {
    const updatedMedic = updateMedicService({
      adminId: req.admin_id,
      medicId: req.params.medic_id,
      medicData: req.body,
    });

    if (!updatedMedic) {
      return res.status(500).json({ message: 'Error while updating medic.' });
    }

    return res.status(200).json({
      message: 'Medic updated successfully.',
      updatedMedic,
    });
  } catch (error) {
    console.error('Error updating medic:', error);

    return res.status(500).json({
      message: 'Error updating medic:',
      error: error.message,
    });
  }
}
