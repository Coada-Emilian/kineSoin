/**
 * @description Handles patient registration requests and creates a new patient account.
 *
 * Responsibilities:
 * - Validates incoming registration data.
 * - Retrieves uploaded file information from the request.
 * - Delegates patient creation logic to the service layer.
 * - Returns the appropriate HTTP response with created patient information.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Registration rules, data processing, and persistence are handled by the service layer.
 */

import registerPatientService from '../../../../services/registration/registerPatient.js';
import registeredPatientSchema from '../../../../validations/joi/registration/registeredPatientSchema.js';

export default async function registerPatient(req, res) {
  const { error } = registeredPatientSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  const patientData = {
    ...req.body,
    file: req.file,
  };

  const newPatient = await registerPatientService(patientData);

  return res.status(201).json({
    message: 'Patient registered successfully.',
    patient: {
      id: newPatient.id,
      fullName: `${newPatient.name} ${newPatient.surname}`,
      email: newPatient.email,
      picture_url: newPatient.picture_url,
    },
  });
}
