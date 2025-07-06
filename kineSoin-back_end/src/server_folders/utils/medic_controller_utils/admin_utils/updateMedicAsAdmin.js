import Joi from 'joi';
import { Medic } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function updateMedicAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);
  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  }

  const medic_id = parseInt(req.params.medic_id, 10);
  checkIsValidNumber(medic_id);

  if (!req.body) {
    return res.status(400).json({
      message:
        'The request body cannot be empty. Please provide the necessary data.',
    });
  }

  try {
    const foundMedic = await Medic.findByPk(medic_id);

    if (!foundMedic) {
      return res.status(404).json({ message: 'Medic not found.' });
    }

    const {
      name,
      surname,
      street_number,
      street_name,
      postal_code,
      city,
      phone_number,
      licence_code,
      email,
      prefix,
    } = req.body;

    const fullPhoneNumber = prefix + phone_number;

    const newMedic = {
      admin_id: admin_id || foundMedic.admin_id,
      name: name === '' ? foundMedic.name : name,
      surname: surname === '' ? foundMedic.surname : surname,
      street_number:
        street_number === '' ? foundMedic.street_number : street_number,
      street_name: street_name === '' ? foundMedic.street_name : street_name,
      postal_code: postal_code === '' ? foundMedic.postal_code : postal_code,
      city: city === '' ? foundMedic.city : city,
      phone_number:
        phone_number === '' ? foundMedic.phone_number : phone_number,
      licence_code:
        licence_code === '' ? foundMedic.licence_code : licence_code,
      email: email === '' ? foundMedic.email : email,
      prefix: prefix === '' ? foundMedic.prefix : prefix,
      full_phone_number:
        fullPhoneNumber === '' ? foundMedic.full_phone_number : fullPhoneNumber,
    };

    const updatedMedicSchema = Joi.object({
      admin_id: Joi.number().required(),
      name: Joi.string().optional(),
      surname: Joi.string().optional(),
      street_number: Joi.string().optional(),
      street_name: Joi.string().optional(),
      postal_code: Joi.string().optional(),
      city: Joi.string().optional(),
      phone_number: Joi.string().optional(),
      licence_code: Joi.string().optional(),
      prefix: Joi.string().optional(),
      full_phone_number: Joi.string().optional(),
      email: Joi.string().email().optional(),
    }).min(1);

    const { error } = updatedMedicSchema.validate(newMedic);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedMedic = await foundMedic.update(newMedic);

    if (!updatedMedic) {
      return res.status(500).json({ message: 'Error while updating medic.' });
    }

    return res.status(200).json({
      message: 'Medic updated successfully.',
      updatedMedic,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating medic.' });
  }
}
