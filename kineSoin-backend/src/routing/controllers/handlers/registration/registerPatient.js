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
  try {
    const { error } = registeredPatientSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
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
  } catch (error) {
    console.error('Error registering patient:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error registering patient.',
    });
  }
}
