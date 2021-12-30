import { Recipe } from '../../../utils/db/models/Recipe';
import { Category } from '../../../utils/db/models/Category';
import { RecipeCategory } from '../../../utils/db/models/RecipeCategory';

export default async function findUserRecipes(req, res) {
  const { id } = req.query;

  const recipe = await Recipe.findOne({ where: { id } });

  if (!recipe) {
    res.status(400).json({ success: false });
    return;
  }

  const recipeCategories = await RecipeCategory.findAll({
    where: { recipeId: recipe.id },
  });

  let categories = [];
  for (let i = 0; i < recipeCategories.length; i++) {
    const cat = await Category.findOne({
      where: { id: recipeCategories[i].categoryId },
    });

    if (cat) categories.push(cat);
  }

  const r = { ...recipe.dataValues, categories };

  res.json(r);
  return;
}
