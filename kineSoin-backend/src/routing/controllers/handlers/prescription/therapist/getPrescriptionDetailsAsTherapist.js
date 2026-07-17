import getPrescriptionDetailsService from '../../../../../services/prescription/therapist/getPrescriptionDetailsAsTherapist.js';

export default async function getPrescriptionDetailsAsTherapist(req, res) {
  const prescriptionDetails = await getPrescriptionDetailsService({
    therapistId: req.user.id,
    prescriptionId: req.params.prescription_id,
  });

  if (!prescriptionDetails) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  return res.status(200).json(prescriptionDetails);
}
