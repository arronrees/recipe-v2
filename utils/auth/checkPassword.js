import bcrypt from 'bcrypt';

export default async function checkPassword(enteredPassword, originalPassword) {
  const checkedPassword = await bcrypt.compare(
    enteredPassword,
    originalPassword
  );

  return checkedPassword;
}
