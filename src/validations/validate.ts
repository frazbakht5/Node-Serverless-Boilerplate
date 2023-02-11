import { Validator } from 'jsonschema';
const v = new Validator();

export default (body: any, schema: any) => {
  const validationResult = v.validate(body, schema);

  const errors = validationResult.errors;
  const errorMessage = validationResult.errors.map((e) => e.stack).join('. ');

  if (errors.length > 0) {
    return {
      validate: false,
      error: 1,
      message: errorMessage,
    };
  } else {
    return {
      validate: true,
      error: 0,
      message: 'valid body',
    };
  }
};
