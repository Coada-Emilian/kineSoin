import Joi from 'joi';
import { Scrypt } from '../../../authentification/Scrypt.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Patient } from '../../../models/index.js';
import { checkPatientStatus } from '../../checkPatientStatus.js';

export default async function updateConnectedPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const updatedPatientSchema = Joi.object({
        name: Joi.string().max(50).optional(),
        surname: Joi.string().max(50).optional(),
        birth_date: Joi.date().optional(),
        gender: Joi.string()
          .max(10)
          .valid('male', 'female', 'other')
          .optional(),
        street_number: Joi.string().optional(),
        street_name: Joi.string().max(50).optional(),
        postal_code: Joi.string().max(10).optional(),
        city: Joi.string().max(100).optional(),
        prefix: Joi.string().max(10).optional(),
        phone_number: Joi.string().max(15).optional(),
        email: Joi.string().email({ minDomainSegments: 2 }).optional(),
        new_password: Joi.string().min(12).max(255).optional(),
        picture_url: Joi.string().max(255).optional(),
        picture_id: Joi.string().max(255).optional(),
      }).min(0);

      if (!req.body) {
        return res.status(400).json({
          message:
            'Request body is missing. Please provide the necessary data.',
        });
      } else {
        const { error } = updatedPatientSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const {
          name,
          surname,
          birth_date,
          gender,
          street_number,
          street_name,
          postal_code,
          city,
          prefix,
          phone_number,
          email,
          new_password,
          picture_url,
          picture_id,
        } = req.body;

        const foundPatient = await Patient.findByPk(patient_id);

        if (!foundPatient) {
          return res.status(400).json({ message: 'Patient not found' });
        } else {
          checkPatientStatus(foundPatient);

          const newProfile = {
            name: name || foundPatient.name,
            surname: surname || foundPatient.surname,
            birth_date: birth_date || foundPatient.birth_date,
            gender: gender || foundPatient.gender,
            street_number: street_number || foundPatient.street_number,
            street_name: street_name || foundPatient.street_name,
            postal_code: postal_code || foundPatient.postal_code,
            city: city || foundPatient.city,
            prefix: prefix || foundPatient.prefix,
            phone_number: phone_number || foundPatient.phone_number,
            full_phone_number: prefix + phone_number,
            email: email || foundPatient.email,
            picture_url: picture_url || foundPatient.picture_url,
            picture_id: picture_id || foundPatient.picture_id,
          };

          if (new_password) {
            const hashedNewPassword = Scrypt.hash(new_password);

            newProfile.password = hashedNewPassword;
          }

          await foundPatient.update(newProfile);

          return res.status(200).json({
            message: 'Profile updated successfully!',
            foundPatient: {
              id: foundPatient.id,
              name: foundPatient.name,
              surname: foundPatient.surname,
              gender: foundPatient.gender,
              address: `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`,
              email: foundPatient.email,
              picture_url: foundPatient.picture_url,
              age: computeAge(foundPatient.birth_date),
            },
          });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
