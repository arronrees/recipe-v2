import createUser from '../../../utils/auth/createUser';
import { joiUser } from '../../../utils/auth/joiUser';
import catchUserErrors from '../../../utils/auth/catchUserErrors';

import { withSessionRoute } from '../../../utils/iron/withSession';
import sendEmailVerification from '../../../utils/email/sendEmailVerification';

export default withSessionRoute(signUp);

async function signUp(req, res) {
  const { body } = req;

  // validate user details sent in request
  const { error } = joiUser.validate(body);

  if (error) {
    const errors = catchUserErrors(error);

    res.status(400).json(errors);
    return;
  }

  const user = await createUser(body);

  // if no error create user
  if (user === 'User already registered') {
    res.status(400).json({ message: 'User already registered' });
    return;
  } else {
    const userToShow = { ...user.dataValues, password: 'hidden' };

    // const email = await sendEmailVerification();

    // save user to session
    req.session.user = userToShow;
    await req.session.save();

    res.status(200).json({ loggedIn: true });
    return;
  }
}
