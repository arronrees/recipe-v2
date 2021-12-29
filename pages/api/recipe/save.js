import { SavedRecipe } from '../../../utils/db/models/SavedRecipes';

export default async function saveRecipe(req, res) {
  const { userId, recipeId } = req.query;

  const savedRecipe = await SavedRecipe.create({ userId, recipeId });

  res.json({ message: 'Recipe saved successfully' });
  return;
}
