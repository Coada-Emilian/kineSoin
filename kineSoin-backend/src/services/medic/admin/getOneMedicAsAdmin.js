import { Admin, Medic } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getOneMedicAsAdmin({ adminId, medicId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const medic_id = getValidId(medicId, 'Medic ID');

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

  const sentMedic = {
    ...foundMedic.dataValues,
    full_name: `${foundMedic.name} ${foundMedic.surname}`,
    address: `${foundMedic.street_number} ${foundMedic.street_name}, ${foundMedic.postal_code} ${foundMedic.city}`,
    full_phone_number: `${foundMedic.prefix}  ${foundMedic.phone_number}`,
  };

  return sentMedic;
}
