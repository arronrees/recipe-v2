import { User } from '../../../utils/db/models/User';

export default async function findUser(req, res) {
  const { id } = req.query;

  const user = await User.findOne({ where: { id } });

  res.json(user);
  return;
}
