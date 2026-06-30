/**
 * @description Retrieves all medics for the authenticated patient, returning a
 *              lightweight list containing only IDs and combined name metadata.
 *
 * Rationale:
 * - Ensures patients can access a simplified directory of medics for selection
 *   within appointment or messaging workflows.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the patient ID before performing any read operation.
 * - Returns a normalized dataset with `fullName` to simplify frontend consumption.
 * - Provides clear, consistent HTTP status codes for missing records and
 *   unexpected server errors.
 */

import { Medic } from '../../../../models/index.js';

export default async function getMedicNamesAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

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
