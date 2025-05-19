import { Medic } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getAllMedicsAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const foundMedics = await Medic.findAll({
        attributes: [
          'id',
          'name',
          'surname',
          'street_number',
          'street_name',
          'postal_code',
          'city',
          'phone_number',
          'licence_code',
        ],
      });

      if (foundMedics.length === 0) {
        return res.status(404).json({ message: 'No medics found.' });
      } else {
        const sentMedics = [];

        for (const medic of foundMedics) {
          const newMedic = {
            id: medic.id,
            fullName: `${medic.name} ${medic.surname}`,
            address: `${medic.street_number} ${medic.street_name}, ${medic.postal_code} ${medic.city}`,
            phone_number: medic.phone_number,
            licence_code: medic.licence_code,
          };

          sentMedics.push(newMedic);
        }
        return res.status(200).json(sentMedics);
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching medics.' });
    }
  }
}
