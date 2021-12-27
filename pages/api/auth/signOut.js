import { withSessionRoute } from '../../../utils/iron/withSession';

export default withSessionRoute(signOut);

function signOut(req, res, session) {
  req.session.destroy();
  res.json({ loggedIn: false });
}
