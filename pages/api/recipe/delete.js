import { Recipe } from '../../../utils/db/models/Recipe';

export default async function deleteRecipe(req, res) {
  const { id } = req.query;

  const recipe = await Recipe.destroy({ where: { id } });

  res.json({ message: 'Recipe deleted successfully' });
  return;
}
