import { Recipe } from '../../../utils/db/models/Recipe';
import { SavedRecipe } from '../../../utils/db/models/SavedRecipe';

export default async function findUserSavedRecipes(req, res) {
  const { userId } = req.query;

  const savedRecipes = await SavedRecipe.findAll({ where: { userId } });

  let recipes = [];

  for (let i = 0; i < savedRecipes.length; i++) {
    const r = await Recipe.findOne({ where: { id: savedRecipes[i].recipeId } });
    recipes.push(r);
  }

  console.log(recipes);

  res.json(recipes);
}
