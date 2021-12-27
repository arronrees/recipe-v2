import { joiUserLogin } from '../../../utils/auth/joiUser';
import catchUserErrors from '../../../utils/auth/catchUserErrors';
import { withSessionRoute } from '../../../utils/iron/withSession';
import { User } from '../../../utils/db/models/User';
import checkPassword from '../../../utils/auth/checkPassword';

export default withSessionRoute(signIn);

async function signIn(req, res) {
  const { body } = req;

  // validate user details sent in request
  const { error } = joiUserLogin.validate(body);

  if (error) {
    const errors = catchUserErrors(error);

    res.status(400).json(errors);
    return;
  }

  // if no error find user in db
  const user = await User.findOne({
    where: {
      email: body.email,
    },
  });

  // no user found
  if (!user) {
    res.status(400).json({ email: 'Email not registered, please sign up' });
    return;
  }

  // check password matches db
  const passwordMatches = await checkPassword(body.password, user.password);

  if (!passwordMatches) {
    res
      .status(400)
      .json({ password: 'Incorrect details, please check and try again' });
  } else {
    const userToshow = { ...user.dataValues, password: 'hidden' };
    req.session.user = userToshow;

    await req.session.save();

    res.status(200).json({ loggedIn: true });
    return;
  }
}
