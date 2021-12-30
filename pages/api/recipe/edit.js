import { Recipe } from '../../../utils/db/models/Recipe';
import { RecipeCategory } from '../../../utils/db/models/RecipeCategory';
import { Category } from '../../../utils/db/models/Category';
import { joiRecipeEdit } from '../../../utils/recipe/joiRecipe';

export default async function editRecipe(req, res) {
  const { body } = req;
  const { id } = req.query;

  // validate request body
  const { error } = joiRecipeEdit.validate(body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  // no error update recipe
  const recipe = await Recipe.findOne({ where: { id } });
  recipe.update(body);
  recipe.totalTime = parseFloat(recipe.prepTime) + parseFloat(recipe.cookTime);
  recipe.save();

  const recipeCategories = await RecipeCategory.destroy({
    where: { recipeId: recipe.id },
  });

  if (body.categories.length > 0) {
    for (let i = 0; i < body.categories.length; i++) {
      let cat = await Category.findOne({ where: { name: body.categories[i] } });
      if (!cat) {
        cat = await Category.create({ name: body.categories[i] });
      }

      const recipeCategory = await RecipeCategory.create({
        categoryId: cat.id,
        recipeId: recipe.id,
      });
    }
  }

  res.json({ message: 'Recipe updated successfully' });
  return;
}
