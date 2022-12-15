import Joi from 'joi';

export interface UserValidationSchema {
  create: Joi.Schema;
  listUsers: Joi.Schema;
}

const userSchema: UserValidationSchema = {
  create: Joi.object().keys({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }),
  listUsers: Joi.object().keys({
    query: Joi.object().keys({
      offset: Joi.number(),
      limit: Joi.number()
    })
  })
};

export default userSchema;
