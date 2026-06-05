import Joi from 'joi';

const createdBodyRegionSchema = Joi.object({
  name: Joi.string().max(50).required(),
});

export default createdBodyRegionSchema;
