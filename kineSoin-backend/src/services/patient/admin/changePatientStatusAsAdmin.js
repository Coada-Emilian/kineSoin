import { Admin, Patient } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function changePatientStatusAsAdmin({
  adminId,
  patientId,
  statusData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const patient_id = getValidId(patientId, 'Patient ID');

  const { status } = statusData;

  const foundPatient = await findOrThrow(Patient, patient_id, 'Patient');

  await foundPatient.update({ status });
}
