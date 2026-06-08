import Joi from 'joi';

const createdMessageSchema = Joi.string().min(1).max(255).required();

export default createdMessageSchema;
