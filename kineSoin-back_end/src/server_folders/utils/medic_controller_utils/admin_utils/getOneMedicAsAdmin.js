import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Medic } from '../../../models/index.js';

export default async function getOneMedicAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const medic_id = parseInt(req.params.medic_id, 10);

      checkIsValidNumber(medic_id);

      const foundMedic = await Medic.findByPk(medic_id, {
        attributes: [
          'id',
          'name',
          'surname',
          'street_number',
          'street_name',
          'postal_code',
          'city',
          'prefix',
          'phone_number',
          'licence_code',
          'email',
        ],
      });

      const fullPhoneNumber = foundMedic.prefix + foundMedic.phone_number;

      if (!foundMedic) {
        return res.status(404).json({ message: 'No medic found.' });
      } else {
        const sentMedic = {
          id: foundMedic.id,
          name: foundMedic.name,
          surname: foundMedic.surname,
          street_number: foundMedic.street_number,
          street_name: foundMedic.street_name,
          postal_code: foundMedic.postal_code,
          city: foundMedic.city,
          fullName: `${foundMedic.name} ${foundMedic.surname}`,
          address: `${foundMedic.street_number} ${foundMedic.street_name}, ${foundMedic.postal_code} ${foundMedic.city}`,
          phone_number: foundMedic.phone_number,
          prefix: foundMedic.prefix,
          full_phone_number: fullPhoneNumber,
          licence_code: foundMedic.licence_code,
          email: foundMedic.email,
        };

        return res.status(200).json(sentMedic);
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching medic.' });
    }
  }
}
