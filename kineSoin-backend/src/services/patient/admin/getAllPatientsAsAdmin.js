/**
 * @description Retrieves all patients for the authenticated admin, returning a
 *              normalized, frontend‑ready list ordered by status and name.
 *
 * Rationale:
 * - Ensures only verified administrators can access patient listings, protecting
 *   system integrity and preventing unauthorized reads.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the admin ID before performing any read operation.
 * - Returns a lightweight dataset containing essential fields, including a
 *   computed `fullName` for cleaner frontend consumption.
 * - Provides clear, consistent HTTP status codes for empty results and unexpected errors.
 */

import { Admin, Patient } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllPatientsAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const foundPatients = await Patient.findAll({
      attributes: ['id', 'name', 'surname', 'status'],
      order: [
        ['status', 'ASC'],
        ['name', 'ASC'],
      ],
      include: [
        {
          association: 'therapist',
          attributes: ['id', 'name', 'surname'],
        },
      ],
    });

    if (!foundPatients || foundPatients.length === 0) {
      return res.status(404).json({ message: 'No patients found' });
    }

    const sentPatients = foundPatients.map((patient) => ({
      id: patient.id,
      status: patient.status,
      name: patient.name,
      surname: patient.surname,
      fullName: `${patient.name} ${patient.surname}`,
    }));

    return res.status(200).json(sentPatients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    
    return res
      .status(500)
      .json({ message: `Error fetching patients: ${error.message}` });
  }
}
