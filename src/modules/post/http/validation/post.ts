import Joi from 'joi';

interface PostValidationSchema {
  create: Joi.Schema;
  getPostById: Joi.Schema;
}

const postValidationSchema: PostValidationSchema = {
  create: Joi.object().keys({
    body: Joi.object().keys({
      title: Joi.string(),
      content: Joi.string().required()
    })
  }),
  getPostById: Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  })
};

export default postValidationSchema;
