import { Admin, Medic } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function updateMedicAsAdmin({
  adminId,
  medicId,
  medicData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const medic_id = getValidId(medicId, 'Medic ID');

  const foundMedic = await Medic.findByPk(medic_id);

  const {
    name,
    surname,
    street_number,
    street_name,
    postal_code,
    city,
    phone_number,
    licence_code,
    email,
    prefix,
  } = medicData;

  const newMedic = {
    admin_id: admin_id || foundMedic.admin_id,
    name: name || foundMedic.name,
    surname: surname || foundMedic.surname,
    street_number: street_number || foundMedic.street_number,
    street_name: street_name || foundMedic.street_name,
    postal_code: postal_code || foundMedic.postal_code,
    city: city || foundMedic.city,
    phone_number: phone_number || foundMedic.phone_number,
    licence_code: licence_code || foundMedic.licence_code,
    email: email || foundMedic.email,
    prefix: prefix || foundMedic.prefix,
    full_phone_number: prefix + phone_number || foundMedic.full_phone_number,
  };

  const updatedMedic = await foundMedic.update(newMedic);

  return updatedMedic;
}
