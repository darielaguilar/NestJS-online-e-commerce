import validator from 'validator';

export class UserValidator {
  static RegisterValidate(body, toValidate: string[]) {
    const errors: string[] = [];

    if (toValidate.includes('name') && validator.isEmpty(body.name)) {
      errors.push('Name cannot be empty');
    }

    if (toValidate.includes('email') && !validator.isEmail(body.email)) {
      errors.push('Invalid Email format');
    }

    if (toValidate.includes('password') && validator.isEmpty(body.password)) {
      errors.push('Password cannot be empty');
    }
    //Esta ultima validacion no funciona mejorar
    if (toValidate.includes('password') && body.password < 5) {
      errors.push('password must be great than 5 characters');
    }
    return errors;
  }
  static LoginValidate(body, toValidate: string[]) {
    const errors: string[] = [];

    if (toValidate.includes('email') && !validator.isEmail(body.email)) {
      errors.push('Invalid Email format');
    }

    if (toValidate.includes('password') && validator.isEmpty(body.password)) {
      errors.push('Password cannot be empty');
    }
    return errors;
  }
}
