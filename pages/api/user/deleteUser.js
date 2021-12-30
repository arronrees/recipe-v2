import { Recipe } from '../../../utils/db/models/Recipe';
import { SavedRecipe } from '../../../utils/db/models/SavedRecipe';
import { User } from '../../../utils/db/models/User';

import { withSessionRoute } from '../../../utils/iron/withSession';

export default withSessionRoute(deleteUser);

async function deleteUser(req, res) {
  const { id } = req.query;

  const user = await User.findOne({ where: { id } });
  const savedRecipes = await SavedRecipe.destroy({ where: { userId: id } });
  const recipes = await Recipe.destroy({ where: { userId: id } });
  const u = await user.destroy();

  req.session.destroy();

  res.json({ message: 'User deleted successfully' });
  return;
}
