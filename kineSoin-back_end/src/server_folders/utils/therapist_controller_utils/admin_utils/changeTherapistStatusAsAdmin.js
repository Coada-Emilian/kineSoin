import { Therapist } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function changeTherapistStatusAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const therapist_id = parseInt(req.params.therapist_id, 10);

      checkIsValidNumber(therapist_id);

      const updatedTherapistStatusSchema = Joi.object({
        status: Joi.string().valid('active', 'inactive'),
      });

      if (!req.body) {
        return res.status(400).json({
          message: 'Please provide the status to update the therapist',
        });
      } else {
        const { error } = updatedTherapistStatusSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const { status } = req.body;

        const foundTherapist = await Therapist.findByPk(therapist_id);

        if (!foundTherapist) {
          return res.status(400).json({ message: 'Therapist not found' });
        } else {
          await foundTherapist.update({ status });
        }

        return res
          .status(200)
          .json({ message: 'Therapist status updated successfully!' });
      }
    } catch (error) {
      console.error('Error changing therapist status:', error);
    }
  }
}
