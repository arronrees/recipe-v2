import { catchUserErrors } from '../../../utils/auth/catchUserErrors';
import { joiUserDetails } from '../../../utils/auth/joiUser';
import { User } from '../../../utils/db/models/User';
import { withSessionRoute } from '../../../utils/iron/withSession';

export default withSessionRoute(updateDetails);

async function updateDetails(req, res) {
  const { body } = req;

  // validate user details sent in request
  const { error } = joiUserDetails.validate(body);

  if (error) {
    const errors = catchUserErrors(error);

    res.status(400).json(errors);
    return;
  }

  // if no error update details
  const user = await User.findOne({
    where: {
      id: body.id,
    },
  });

  user.firstName = body.firstName;
  user.lastName = body.lastName;
  await user.save();

  const userToShow = { ...user.dataValues, password: 'hidden' };

  // save updated user details to session
  req.session.user = userToShow;
  await req.session.save();

  res.json({ message: 'User details updated successfully' });
  return;
}
