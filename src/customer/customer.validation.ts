import * as Joi from 'joi';

const customerValidation = {
  createCustomer: {
    body: Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
    }),
  },
};

export default customerValidation;
