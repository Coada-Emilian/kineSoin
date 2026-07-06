import { Prescription } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function incrementPrescriptionAppointmentQuantityAsTherapist({
  prescriptionId,
}) {
  const prescription_id = getValidId(prescriptionId, 'Prescription ID');

  const foundPrescription = await findOrThrow(
    Prescription,
    prescription_id,
    'Prescription'
  );

  foundPrescription.appointment_quantity += 1;

  return await foundPrescription.save();
}
