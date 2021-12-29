import { joiUserLogin } from '../../../utils/auth/joiUser';
import { withSessionRoute } from '../../../utils/iron/withSession';
import { User } from '../../../utils/db/models/User';
import { checkPassword } from '../../../utils/auth/passwordUtils';
import { SavedRecipe } from '../../../utils/db/models/SavedRecipe';
import { Recipe } from '../../../utils/db/models/Recipe';

export default withSessionRoute(signIn);

async function signIn(req, res) {
  const { body } = req;

  // validate user details sent in request
  const { error } = joiUserLogin.validate(body);

  if (error) {
    res
      .status(400)
      .json({ message: 'Incorrect details, please check and try again' });
    return;
  }

  // if no error find user in db
  const user = await User.findOne({
    where: {
      email: body.email,
    },
  });

  // no user found
  if (!user) {
    res
      .status(400)
      .json({ message: 'Incorrect details, please check and try again' });
    return;
  }

  // check password matches db
  const passwordMatches = await checkPassword(body.password, user.password);

  if (!passwordMatches) {
    res
      .status(400)
      .json({ message: 'Incorrect details, please check and try again' });
  } else {
    const saved = await SavedRecipe.findAll({
      where: { userId: user.id },
    });

    let savedRecipes = [];

    saved.forEach((recipe) => {
      savedRecipes.push(recipe.recipeId);
    });

    const userToshow = { ...user.dataValues, password: 'hidden', savedRecipes };

    req.session.user = userToshow;
    await req.session.save();

    res.status(200).json({ loggedIn: true });
    return;
  }
}
