import deleteAppointmentService from '../../../../services/appointment/therapist/deleteAppointmentAsTherapist.js';

export default async function deleteAppointmentAsTherapist(req, res) {
  const deletedAppointment = await deleteAppointmentService({
    therapistId: req.therapist_id,
    appointmentId: req.params.appointment_id,
  });

  if (!deletedAppointment) {
    const err = new Error('Appointment not found');
    err.statusCode = 400;
    throw err;
  }

  return res.status(200).json({ message: 'Appointment successfully deleted' });
}
