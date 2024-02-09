import { JoiSchema, ValidatorSchema } from 'src/usecases/protocols/dataValidator/validatorSchema';

export class JoiAdapter implements ValidatorSchema {
  validate(data: any, schema: JoiSchema): string | null {
    const { error } = schema.validate(data);

    return error ? error.message : null;
  }
}
