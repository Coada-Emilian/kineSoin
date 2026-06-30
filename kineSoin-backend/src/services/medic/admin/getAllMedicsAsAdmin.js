import { Admin, Medic } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllMedicsAsAdmin({ adminId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const foundMedics = await Medic.findAll({
    attributes: ['id', 'name', 'surname', 'licence_code'],
  });

  const sentMedics = [];

  for (const medic of foundMedics) {
    const newMedic = {
      id: medic.id,
      fullName: `${medic.name} ${medic.surname}`,
      licence_code: medic.licence_code,
    };

    sentMedics.push(newMedic);
  }

  return sentMedics;
}
