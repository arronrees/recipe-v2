import { Recipe } from '../../../utils/db/models/Recipe';

export default async function findUserRecipes(req, res) {
  const { userId } = req.query;

  const recipes = await Recipe.findAll({ where: { userId } });

  res.json(recipes);
}
