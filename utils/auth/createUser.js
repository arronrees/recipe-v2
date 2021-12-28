import { hashPassword } from './passwordUtils';

import { User } from '../db/models/User';

export default async function createUser(user) {
  // find user if already exists
  const foundUser = await User.findOne({
    where: {
      email: user.email,
    },
  });

  // if found return
  // else create new user and return user
  if (foundUser) {
    return 'User already registered';
  } else {
    const hash = await hashPassword(user.password);
    const newUser = { ...user, password: hash };
    const createdUser = await User.create(newUser);

    return createdUser;
  }
}
