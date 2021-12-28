import bcrypt from 'bcrypt';

export async function checkPassword(enteredPassword, originalPassword) {
  const checkedPassword = await bcrypt.compare(
    enteredPassword,
    originalPassword
  );

  return checkedPassword;
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
