import getConnectedTherapistService from '../../../../../services/therapist/therapist/getConnectedTherapistData.js';

export default async function getConnectedTherapistData(req, res) {
  const therapist = await getConnectedTherapistService({
    therapistId: req.user.id,
  });

  if (!therapist) {
    const err = new Error('Therapist not found.');
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(therapist);
}
