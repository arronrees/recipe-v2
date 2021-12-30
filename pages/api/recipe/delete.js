import { Recipe } from '../../../utils/db/models/Recipe';
import { SavedRecipe } from '../../../utils/db/models/SavedRecipe';
import { RecipeCategory } from '../../../utils/db/models/RecipeCategory';

export default async function deleteRecipe(req, res) {
  const { id } = req.query;

  const recipe = await Recipe.destroy({ where: { id } });
  const savedRecipes = await SavedRecipe.destroy({ where: { recipeId: id } });
  const recipeCategories = await RecipeCategory.destroy({
    where: { recipeId: id },
  });

  res.json({ message: 'Recipe deleted successfully' });
  return;
}
