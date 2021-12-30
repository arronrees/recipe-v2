import { RecipeCategory } from '../../../utils/db/models/RecipeCategory';
import { Category } from '../../../utils/db/models/Category';
import { Recipe } from '../../../utils/db/models/Recipe';

export default async function findCategoryRecipes(req, res) {
  const { catId } = req.query;

  const recipeCategories = await RecipeCategory.findAll({
    where: { categoryId: catId },
  });

  let recipes = [];
  for (let i = 0; i < recipeCategories.length; i++) {
    const recipe = await Recipe.findAll({
      where: { id: recipeCategories[i].recipeId },
    });
    if (recipe.length > 0) {
      for (let j = 0; j < recipe.length; j++) {
        recipes.push(recipe[j]);
      }
    }
  }

  const cat = await Category.findOne({ where: { id: catId } });

  res.json({ recipes, cat });
}
