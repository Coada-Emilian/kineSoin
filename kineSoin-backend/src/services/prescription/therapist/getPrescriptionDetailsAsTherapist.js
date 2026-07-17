import { Prescription, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getPrescriptionDetailsAsTherapist({
  therapistId,
  prescriptionId,
}) {
  const therapist_id = getValidId(therapistId, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  const prescription_id = getValidId(prescriptionId, 'Prescription ID');

  const foundPrescription = await Prescription.findByPk(prescription_id, {
    attributes: [
      'id',
      'appointment_quantity',
      'completed_appointment_quantity',
      'is_completed',
      'at_home_care',
      'date',
      'picture_url',
      'prescription_number',
    ],
    include: [
      {
        association: 'affliction',
        attributes: ['id', 'name', 'description', 'insurance_code'],
        include: [{ association: 'body_region', attributes: ['id', 'name'] }],
      },
      {
        association: 'medic',
        attributes: ['id', 'name', 'surname'],
      },
    ],
  });

  return foundPrescription;
}
