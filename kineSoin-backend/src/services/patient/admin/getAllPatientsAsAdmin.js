import { Admin, Patient } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllPatientsAsAdmin({ adminId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const foundPatients = await Patient.findAll({
    attributes: ['id', 'name', 'surname', 'status'],
    order: [
      ['status', 'ASC'],
      ['name', 'ASC'],
    ],
  });

  const sentPatients = foundPatients.map((patient) => ({
    id: patient.id,
    status: patient.status,
    name: patient.name,
    surname: patient.surname,
    fullName: `${patient.name} ${patient.surname}`,
  }));

  return sentPatients;
}
