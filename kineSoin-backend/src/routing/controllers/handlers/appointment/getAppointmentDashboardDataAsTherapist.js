import getAppointmentDashboardDataService from '../../../../services/appointment/therapist/getAppointmentDashboardDataAsTherapist.js';

export default async function getAppointmentDashboardDataAsTherapist(req, res) {
  const sameDayAppointments = await getAppointmentDashboardDataService({
    therapistId: req.user.id,
  });

  if (sameDayAppointments.length === 0) {
    const err = new Error('No appointments found.');
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(sameDayAppointments);
}
