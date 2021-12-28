import { Recipe } from '../../../utils/db/models/Recipe';

export default async function findUserRecipes(req, res) {
  const recipes = await Recipe.findAll({
    where: {
      public: true,
    },
  });

  res.json(recipes);
}
