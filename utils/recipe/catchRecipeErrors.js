export function catchRecipeErrors(err) {
  let message = '';

  // no name supplied
  if (err.message.includes('"name" is not allowed to be empty')) {
    message = 'Name is required';
  }
  if (err.message.includes('"name" is required')) {
    message = 'Name is required';
  }

  return message;
}
