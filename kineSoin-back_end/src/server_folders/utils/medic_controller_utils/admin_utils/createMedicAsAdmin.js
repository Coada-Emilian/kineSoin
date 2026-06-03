import Joi from 'joi';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Medic } from '../../../models/index.js';

export default async function createMedicAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);
  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const createdMedicSchema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        street_number: Joi.string().optional(),
        street_name: Joi.string().required(),
        postal_code: Joi.string().required(),
        city: Joi.string().required(),
        phone_number: Joi.string().required(),
        licence_code: Joi.string().required(),
        prefix: Joi.string().required(),
      });

      if (!req.body) {
        return res.status(400).json({
          message:
            'The request body cannot be empty. Please provide the necessary data.',
        });
      } else {
        const { error } = createdMedicSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }

        const full_phone_number = req.body.prefix + req.body.phone_number;

        const newMedic = {
          admin_id,
          ...req.body,
          full_phone_number,
        };

        const createdMedic = await Medic.create(newMedic);

        if (!createdMedic) {
          return res.status(500).json({
            message: 'Error while creating medic because fuck you.',
          });
        } else {
          return res
            .status(201)
            .json({ message: 'Medic created.', createdMedic });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error creating medic because reasons.' });
    }
  }
}
