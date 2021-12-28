export function catchUserErrors(err) {
  // console.log(err.message);

  let errors = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  // no password entered
  if (err.message.includes('"password" is not allowed to be empty')) {
    errors.password = 'Password cannot by empty';
  }
  if (err.message.includes('"password" is required')) {
    errors.password = 'Password cannot by empty';
  }
  // no first name entered
  if (err.message.includes('"firstName" is not allowed to be empty')) {
    errors.firstName = 'First Name cannot by empty';
  }
  if (err.message.includes('"firstName" is required')) {
    errors.firstName = 'Name cannot by empty';
  }
  // no last name entered
  if (err.message.includes('"lastName" is not allowed to be empty')) {
    errors.lastName = 'Last Name cannot by empty';
  }
  if (err.message.includes('"lastName" is required')) {
    errors.lastName = 'Name cannot by empty';
  }
  // no email entered
  if (err.message.includes('"email" is not allowed to be empty')) {
    errors.email = 'Email cannot by empty';
  }
  if (err.message.includes('"email" is required')) {
    errors.email = 'Email cannot by empty';
  }
  // password not long enough
  if (
    err.message.includes('"password" length must be at least 8 characters long')
  ) {
    errors.password = 'Password must be at least 8 characters';
  }
  // password not long enough
  if (
    err.message.includes('"value" length must be at least 8 characters long')
  ) {
    errors.password = 'Password must be at least 8 characters';
  }
  // email invalid format
  if (err.message.includes('"email" must be a valid email')) {
    errors.email = 'Email must be valid';
  }

  return errors;
}

export function catchPasswordErrors(err) {
  let errors = {
    currPassword: '',
    newPassword: '',
  };

  if (err.message.includes('"currPassword" is not allowed to be empty')) {
    errors.currPassword = 'Current password cannot by empty';
  }
  if (err.message.includes('"currPassword" is required')) {
    errors.currPassword = 'Current password cannot by empty';
  }
  if (err.message.includes('"newPassword" is not allowed to be empty')) {
    errors.newPassword = 'New password cannot by empty';
  }
  if (err.message.includes('"newPassword" is required')) {
    errors.newPassword = 'New password cannot by empty';
  }
  if (
    err.message.includes(
      '"newPassword" length must be at least 8 characters long'
    )
  ) {
    errors.newPassword = 'New password must be at least 8 characters';
  }

  return errors;
}
