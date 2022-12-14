import Joi from 'joi';

export interface UserValidationSchema {
  create: Joi.Schema;
}

const userSchema: UserValidationSchema = {
  create: Joi.object().keys({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  })
};

export default userSchema;
