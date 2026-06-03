import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Therapist } from '../../../models/index.js';

export default async function deleteTherapistAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const therapist_id = parseInt(req.params.therapist_id, 10);

      checkIsValidNumber(therapist_id);

      const response = await Therapist.destroy({
        where: { id: therapist_id },
      });

      if (!response) {
        return res.status(400).json({ message: 'Therapist not found' });
      } else {
        return res
          .status(200)
          .json({ message: 'Therapist deleted successfully!' });
      }
    } catch (err) {
      console.error('Error deleting therapist:', err);
    }
  }
}
