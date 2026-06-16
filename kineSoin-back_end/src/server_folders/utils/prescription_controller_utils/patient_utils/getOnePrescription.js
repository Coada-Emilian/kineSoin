import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Prescription } from '../../../models/index.js';

export default async function getOnePrescription(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    checkIsValidNumber(patient_id);
  }

  const prescription_id = parseInt(req.params.id, 10);

  if (!prescription_id) {
    return res.status(400).json({ message: 'Prescription not found' });
  } else {
    checkIsValidNumber(prescription_id);
  }

  const foundPrescription = await Prescription.findOne({
    where: { id: prescription_id, patient_id: patient_id, is_completed: false },
    attributes: [
      'id',
      'date',
      'appointment_quantity',
      'at_home_care',
      'picture_url',
    ],
    include: [
      {
        association: 'medic',
        attributes: ['id', 'name', 'surname', 'licence_code'],
      },
      {
        association: 'affliction',
        attributes: ['id', 'name', 'description', 'insurance_code'],
      },
    ],
  });

  if (!foundPrescription) {
    return res.status(400).json({ message: 'Prescription not found' });
  } else {
    return res.status(200).json(foundPrescription);
  }
}
