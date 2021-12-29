import { SavedRecipe } from '../../../utils/db/models/SavedRecipe';
import { withSessionRoute } from '../../../utils/iron/withSession';

export default withSessionRoute(unSaveRecipe);

async function unSaveRecipe(req, res) {
  const { userId, recipeId } = req.query;

  const unSavedRecipe = await SavedRecipe.destroy({
    where: { userId, recipeId },
  });

  console.log(unSavedRecipe);

  const user = req.session.user;

  const saved = await SavedRecipe.findAll({ where: { userId: user.id } });

  let savedRecipes = [];

  saved.forEach((recipe) => {
    savedRecipes.push(recipe.recipeId);
  });

  const userToshow = { ...user, password: 'hidden', savedRecipes };

  req.session.user = userToshow;
  await req.session.save();

  res.json({ message: 'Recipe unsaved successfully' });
  return;
}
