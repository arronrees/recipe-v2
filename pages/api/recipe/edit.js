import { Recipe } from '../../../utils/db/models/Recipe';
import { joiRecipeEdit } from '../../../utils/recipe/joiRecipe';

export default async function editRecipe(req, res) {
  const { body } = req;
  const { id } = req.query;

  console.log(id);

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

  res.json({ message: 'Recipe updated successfully' });
  return;
}
