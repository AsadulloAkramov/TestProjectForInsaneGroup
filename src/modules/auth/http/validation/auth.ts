import Joi from 'joi';

interface AuthValidationSchema {
  login: Joi.Schema;
}

const authValidationSchema: AuthValidationSchema = {
  login: Joi.object().keys({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  })
};

export default authValidationSchema;
