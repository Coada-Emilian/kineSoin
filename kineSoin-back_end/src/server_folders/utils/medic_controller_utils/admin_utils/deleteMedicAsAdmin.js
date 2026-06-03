import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Medic } from '../../../models/index.js';

export default async function deleteMedicAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const medic_id = parseInt(req.params.medic_id, 10);

      checkIsValidNumber(medic_id);

      const foundMedic = await Medic.findByPk(medic_id);

      if (!foundMedic) {
        return res.status(404).json({ message: 'Medic not found.' });
      } else {
        const deletedMedic = await foundMedic.destroy();

        if (!deletedMedic) {
          return res
            .status(500)
            .json({ message: 'Error while deleting medic.' });
        } else {
          return res
            .status(200)
            .json({ message: 'Medic deleted successfully.' });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting medic.' });
    }
  }
}
