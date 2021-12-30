import { Category } from '../../../utils/db/models/Category';
import { RecipeCategory } from '../../../utils/db/models/RecipeCategory';
import { Recipe } from '../../../utils/db/models/Recipe';
import { User } from '../../../utils/db/models/USer';
import { joiRecipe } from '../../../utils/recipe/joiRecipe';

export default async function addRecipe(req, res) {
  const { body } = req;

  // validate request body
  const { error } = joiRecipe.validate(body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  // no error create recipe
  const user = await User.findOne({ where: { id: body.userId } });
  const recipe = {
    ...body,
    userName: `${user.firstName} ${user.lastName}`,
    totalTime: parseFloat(body.prepTime) + parseFloat(body.cookTime),
  };
  const createdRecipe = await Recipe.create(recipe);

  if (body.categories.length > 0) {
    for (let i = 0; i < body.categories.length; i++) {
      let cat = await Category.findOne({ where: { name: body.categories[i] } });
      if (!cat) {
        cat = await Category.create({ name: body.categories[i] });
      }

      const recipeCategory = await RecipeCategory.create({
        categoryId: cat.id,
        recipeId: createdRecipe.id,
      });
    }
  }

  res.json({ message: 'Recipe created successfully' });
  return;
}
