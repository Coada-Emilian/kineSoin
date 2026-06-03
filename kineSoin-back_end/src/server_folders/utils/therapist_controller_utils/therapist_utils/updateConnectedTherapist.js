import Joi from 'joi';
import { Scrypt } from '../../../authentification/Scrypt.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Therapist } from '../../../models/index.js';

export default async function updateConnectedTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      checkIsValidNumber(therapist_id);

      const updatedTherapistSchema = Joi.object({
        name: Joi.string().max(50).optional(),
        surname: Joi.string().max(50).optional(),
        email: Joi.string().email({ minDomainSegments: 2 }).optional(),
        new_password: Joi.string().min(12).max(255).optional(),
        repeated_password: Joi.string()
          .valid(Joi.ref('new_password'))
          .optional(),
        old_password: Joi.string()
          .when('new_password', {
            is: Joi.exist(),
            then: Joi.required(),
            otherwise: Joi.optional(),
          })
          .optional(),
        picture_url: Joi.string().max(255).optional(),
        picture_id: Joi.string().max(255).optional(),
        description: Joi.string().max(50).optional(),
        diploma: Joi.string().max(50).optional(),
        experience: Joi.string().max(50).optional(),
        specialty: Joi.string().max(50).optional(),
      }).min(1);

      if (!req.body) {
        return res
          .status(400)
          .json({ message: 'Please provide the data to update the therapist' });
      } else {
        const { error } = updatedTherapistSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        } else {
          const foundTherapist = await Therapist.findByPk(therapist_id, {
            where: { status: 'active' },
          });

          if (!foundTherapist) {
            return res.status(400).json({ message: 'Therapist not found' });
          }

          const {
            name,
            surname,
            email,
            new_password,
            old_password,
            picture_url,
            picture_id,
            description,
            diploma,
            experience,
            specialty,
          } = req.body;

          const newProfile = {
            name: name || foundTherapist.name,
            surname: surname || foundTherapist.surname,
            email: email || foundTherapist.email,
            picture_url: picture_url || foundTherapist.picture_url,
            picture_id: picture_id || foundTherapist.picture_id,
            description: description || foundTherapist.description,
            diploma: diploma || foundTherapist.diploma,
            experience: experience || foundTherapist.experience,
            specialty: specialty || foundTherapist.specialty,
          };

          if (new_password) {
            if (!old_password) {
              return res.status(400).json({
                message: 'Old password is required to change the password.',
              });
            } else if (new_password === old_password) {
              return res.status(400).json({
                message: 'New password cannot be the same as the old password.',
              });
            }

            const isOldPasswordValid = Scrypt.compare(
              old_password,
              foundUser.password
            );

            if (!isOldPasswordValid) {
              return res
                .status(400)
                .json({ message: 'Incorrect old password' });
            }

            if (new_password !== repeated_password) {
              return res
                .status(400)
                .json({ message: 'New passwords do not match' });
            }

            const hashedNewPassword = Scrypt.hash(new_password);

            newProfile.password = hashedNewPassword;
          }

          await foundTherapist.update(newProfile);

          return res.status(200).json({
            message: 'Therapist updated successfully!',
            foundTherapist,
          });
        }
      }
    } catch (error) {
      console.error('Error updating therapist:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
