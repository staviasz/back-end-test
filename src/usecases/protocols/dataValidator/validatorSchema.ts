import * as Joi from 'joi';

export interface JoiSchema {
  validate: (data: any) => Joi.ValidationResult;
}

export interface ValidatorSchema {
  validate: (data: any, schema: JoiSchema) => string | null;
}
