import { SavedRecipe } from '../../../utils/db/models/SavedRecipe';
import { User } from '../../../utils/db/models/User';
import { withSessionRoute } from '../../../utils/iron/withSession';

export default withSessionRoute(saveRecipe);

async function saveRecipe(req, res) {
  const { userId, recipeId } = req.query;

  const savedRecipe = await SavedRecipe.create({ userId, recipeId });

  const user = req.session.user;

  const saved = await SavedRecipe.findAll({ where: { userId: user.id } });

  let savedRecipes = [];

  saved.forEach((recipe) => {
    savedRecipes.push(recipe.recipeId);
  });

  const userToshow = { ...user, password: 'hidden', savedRecipes };

  req.session.user = userToshow;
  await req.session.save();

  res.json({ message: 'Recipe saved successfully' });
  return;
}
