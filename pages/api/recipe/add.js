import { Recipe } from '../../../utils/db/models/Recipe';
import { User } from '../../../utils/db/models/USer';
import { joiRecipe } from '../../../utils/recipe/joiRecipe';
import { withSessionRoute } from '../../../utils/iron/withSession';

export default withSessionRoute(addRecipe);

async function addRecipe(req, res) {
  const { body } = req;

  // validate request body
  const { error } = joiRecipe.validate(body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  // no error create recipe
  const user = await User.findOne({ where: { id: body.userId } });
  const recipe = { ...body, userName: `${user.firstName} ${user.lastName}` };
  const createdRecipe = await Recipe.create(recipe);

  res.json({ message: 'Recipe created successfully' });
  return;
}
