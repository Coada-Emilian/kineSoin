import increaseAppointmentQuantityService from '../../../../../services/prescription/therapist/incrementPrescriptionAppointmentQuantityAsTherapist.js';

export default async function incrementPrescriptionAppointmentQuantityAsTherapist(
  req,
  res
) {
  const response = await increaseAppointmentQuantityService({
    prescriptionId: req.params.prescription_id,
  });

  if (!response) {
    const err = new Error('Error incrementing appointment quantity.');
    err.statusCode = 401;
    throw err;
  }

  return res
    .status(200)
    .json({ message: 'Appointment quantity successfully incremented' });
}
