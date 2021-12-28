import { Recipe } from '../../../utils/db/models/Recipe';

export default async function findUserRecipes(req, res) {
  const { id } = req.query;

  const recipe = await Recipe.findOne({ where: { id, public: true } });

  if (!recipe) {
    res.status(400).json({ success: false });
    return;
  }

  res.json(recipe);
  return;
}
