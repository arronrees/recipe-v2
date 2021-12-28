import { checkPassword, hashPassword } from '../../../utils/auth/passwordUtils';
import { joiUserPassword } from '../../../utils/auth/joiUser';
import { catchPasswordErrors } from '../../../utils/auth/catchUserErrors';
import { User } from '../../../utils/db/models/User';
import { withSessionRoute } from '../../../utils/iron/withSession';

export default withSessionRoute(updatePassword);

async function updatePassword(req, res) {
  const { body } = req;

  // validate password sent in request
  const { error } = joiUserPassword.validate(body);

  if (error) {
    const errors = catchPasswordErrors(error);

    res.status(400).json(errors);
    return;
  }

  // check if current password entered matches db
  const user = await User.findOne({
    where: {
      id: body.id,
    },
  });

  const currPasswordMatch = await checkPassword(
    body.currPassword,
    user.password
  );

  if (!currPasswordMatch) {
    res.json({ currPassword: `Password entered doesn't match user password` });
    return;
  } else {
    const hash = await hashPassword(body.newPassword);

    user.password = hash;
    user.save();

    // save updated user details to session
    req.session.user = user;
    await req.session.save();

    res.json({ message: 'Password updated successfully' });
    return;
  }
}
