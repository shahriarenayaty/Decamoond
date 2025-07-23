import * as Joi from 'joi';

export const configSchema = Joi.object({
  MONGODB_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().default(2 * 60), // default 2 minutes
});
