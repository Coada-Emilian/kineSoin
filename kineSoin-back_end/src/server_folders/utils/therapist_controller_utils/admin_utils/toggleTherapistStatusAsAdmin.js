import { Therapist } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function toggleTherapistStatusAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const therapist_id = parseInt(req.params.therapist_id, 10);

      checkIsValidNumber(therapist_id);

      const foundTherapist = await Therapist.findByPk(therapist_id);

      if (!foundTherapist) {
        return res.status(400).json({ message: 'Therapist not found' });
      }

      if (foundTherapist.status === 'active') {
        foundTherapist.status = 'inactive';
      } else {
        foundTherapist.status = 'active';
      }

      await foundTherapist.save();

      return res
        .status(200)
        .json({ message: 'Therapist status updated successfully!' });
    } catch (error) {
      console.error('Error toggling therapist status:', error);
    }
  }
}
