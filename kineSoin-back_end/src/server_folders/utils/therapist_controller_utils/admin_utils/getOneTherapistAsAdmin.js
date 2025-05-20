import { Therapist } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getOneTherapistAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const therapist_id = parseInt(req.params.therapist_id, 10);
      checkIsValidNumber(therapist_id);

      const foundTherapist = await Therapist.findByPk(therapist_id, {
        attributes: {
          exclude: [
            'password',
            'old_password',
            'new_password',
            'repeated_password',
            'created_at',
            'updated_at',
            'picture_id',
          ],
        },
      });

      if (!foundTherapist) {
        return res.status(400).json({ message: 'Therapist not found' });
      }

      const fullPhoneNumber = `${foundTherapist.prefix}${foundTherapist.phone_number}`;

      // const sentTherapist = {
      //   id: foundTherapist.id,
      //   name: foundTherapist.name,
      //   surname: foundTherapist.surname,
      //   fullName: `${foundTherapist.name} ${foundTherapist.surname}`,
      //   email: foundTherapist.email,
      //   picture_url: foundTherapist.picture_url,
      //   description: foundTherapist.description,
      //   diploma: foundTherapist.diploma,
      //   experience: foundTherapist.experience,
      //   specialty: foundTherapist.specialty,
      //   phone_number: foundTherapist.phone_number,
      //   status: foundTherapist.status,
      //   licence_code: foundTherapist.licence_code,
      //   prefix: foundTherapist.prefix,
      //   full_phone_number: fullPhoneNumber,
      //   phone_number: foundTherapist.phone_number,
      // };

      return res
        .status(200)
        .json({ ...foundTherapist, fullName, fullPhoneNumber });
    } catch (err) {
      console.error('Error fetching therapist:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
