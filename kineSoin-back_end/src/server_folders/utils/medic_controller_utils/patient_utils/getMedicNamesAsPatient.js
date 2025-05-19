import { Medic } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getMedicNamesAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient ID is required.' });
  } else {
    try {
      const foundMedics = await Medic.findAll({
        attributes: ['id', 'name', 'surname'],
      });

      if (!foundMedics) {
        return res.status(404).json({ message: 'No medics found.' });
      } else {
        const sentMedics = [];

        for (const medic of foundMedics) {
          const newMedic = {
            id: medic.id,
            fullName: `${medic.name} ${medic.surname}`,
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
