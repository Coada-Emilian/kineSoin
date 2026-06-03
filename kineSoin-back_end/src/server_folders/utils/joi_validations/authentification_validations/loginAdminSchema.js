import Joi from 'joi';

const loginAdminSchema = Joi.object({
  email: Joi.string()
    .max(255)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'fr'] },
    })
    .required(),
  password: Joi.required(),
});

export default loginAdminSchema;
