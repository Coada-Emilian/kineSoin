/**
 * @function getTherapistAppointmentDashboardData
 * @description
 * Retrieves dashboard data for an authenticated therapist, including all
 * accepted appointments scheduled for the current day.
 *
 * This controller:
 * - Validates the therapist ID using `getValidId`.
 * - Determines the current date.
 * - Retrieves all accepted and non-canceled appointments for the current day.
 * - Orders appointments chronologically by appointment time.
 * - Includes related patient information.
 * - Includes prescription details and associated affliction information.
 * - Returns the list of appointments for display on the therapist dashboard.
 *
 * Behavior:
 * - Ensures only authenticated therapists can access dashboard data.
 * - Retrieves only appointments that:
 *   - Belong to the authenticated therapist.
 *   - Have been accepted.
 *   - Have not been canceled.
 *   - Are scheduled for the current date.
 * - Returns enriched appointment data with patient, prescription, and affliction details.
 * - Returns a friendly message when no appointments are scheduled for the day.
 *
 * Error handling:
 * - Returns 400 if the therapist ID is missing or invalid.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.therapist_id` {number} Therapist ID injected by authentication middleware.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: List of today's appointments with related data.
 *   - 200: Message indicating no appointments are scheduled today.
 *   - 400: Invalid or missing therapist ID.
 *   - 500: Internal server error.
 *
 * Response payload:
 * - `sameDayAppointments` {Array<Object>} List of appointments scheduled today.
 *   - `id` {number} Appointment ID.
 *   - `date` {string} Appointment date.
 *   - `time` {string} Appointment time.
 *   - `patient` {Object} Associated patient information.
 *   - `prescription` {Object} Associated prescription information.
 *   - `prescription.affliction` {Object} Associated affliction information.
 *
 * @sideEffects
 * - None (read-only database operation).
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Appointment } from '../../../models/index.js';

export default async function getTherapistAppointmentDashboardData(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  try {
    const currentDate = new Date().toISOString().split('T')[0];

    const sameDayAppointments = await Appointment.findAll({
      attributes: ['id', 'date', 'time'],
      where: {
        therapist_id,
        is_accepted: true,
        is_canceled: false,
        date: currentDate,
      },
      order: [['time', 'ASC']],
      include: [
        {
          association: 'patient',
          attributes: ['id', 'name', 'surname', 'picture_url'],
        },
        {
          association: 'prescription',
          attributes: ['id', 'appointment_quantity'],
          include: [
            {
              association: 'affliction',
              attributes: ['id', 'name', 'description', 'insurance_code'],
            },
          ],
        },
      ],
    });

    if (sameDayAppointments.length > 0) {
      return res.status(200).json({ sameDayAppointments });
    } else {
      return res.status(200).json({ message: 'No appointments today' });
    }
  } catch (error) {
    console.error('Error fetching therapist dashboard data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
