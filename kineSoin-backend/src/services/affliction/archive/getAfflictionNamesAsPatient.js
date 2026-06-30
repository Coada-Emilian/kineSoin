/**
 * @description Retrieves a lightweight, patient‑facing list of affliction names.
 *
 * Rationale:
 * - Provides patients with a simplified, alphabetized set of afflictions without
 *   exposing full medical details, keeping the endpoint efficient and easy to use.
 * - Validates the requesting patient's identity and ensures predictable error
 *   handling for missing IDs, empty results, or server‑side failures.
 *
 * Notes:
 * - Returns only `id` and `name` to keep payloads small.
 * - Delegates data access to the Affliction model while keeping controller logic
 *   focused on validation and response formatting.
 */

import { Affliction } from '../../../models/index.js';

export default async function getAfflictionNamesAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  // checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient ID is required.' });
  } else {
    try {
      const foundAfflictions = await Affliction.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
      });

      if (!foundAfflictions) {
        return res.status(404).json({ message: 'No afflictions found.' });
      } else {
        return res.status(200).json(foundAfflictions);
      }
    } catch (error) {
      console.error('Error fetching afflictions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
