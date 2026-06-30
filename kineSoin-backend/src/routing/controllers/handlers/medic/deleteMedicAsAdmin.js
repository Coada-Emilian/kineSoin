import deleteMedicService from '../../../../services/medic/admin/deleteMedic2AsAdmin.js';

export default async function deleteMedicAsAdmin(req, res) {
  try {
    await deleteMedicService({
      adminId: req.admin_id,
      medicId: req.params.medic_id,
    });

    return res.status(200).json({
      message: 'Medic deleted successfully.',
    });
  } catch (error) {
    if (error.message === 'Medic not found') {
      return res.status(404).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: error.message,
    });
  }
}
