import joi from 'joi';

const fightersSchema = joi.object({
  firstUser: joi.string().required(),
  secondUser: joi.string().required()
});

export default fightersSchema;
