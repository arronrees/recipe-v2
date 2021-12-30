import { withSessionRoute } from '../../../utils/iron/withSession';

export default withSessionRoute(signOut);

function signOut(req, res) {
  req.session.destroy();
  res.json({ loggedIn: false });
}
