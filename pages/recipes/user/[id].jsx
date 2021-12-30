import { withSessionSsr } from '../../../utils/iron/withSession';

import Layout from '../../../components/Layout';
import Seo from '../../../components/Seo';
import Header from '../../../components/Header';
import Menu from '../../../components/profile/menu';
import RecipeGrid from '../../../components/recipes/RecipeGrid';
import RecipeGridItem from '../../../components/recipes/RecipeGridItem';

export default function UserRecipes({ user, recipes, userName }) {
  return (
    <Layout>
      <Seo title='My Details' />
      <Header user={user} />
      <main>
        <section>
          <h1 className='px-4 capitalize text-xl font-semibold text-gray-500'>
            {userName}
          </h1>
          <RecipeGrid>
            {recipes &&
              recipes.map((recipe) => (
                <RecipeGridItem key={recipe.id} recipe={recipe} />
              ))}
          </RecipeGrid>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res, params }) {
    const user = req.session.user;

    const { id } = params;

    const data = await fetch(
      `http://localhost:3000/api/recipe/findUserRecipes?userId=${id}`
    );
    const recipes = await data.json();

    const userRes = await fetch(
      `http://localhost:3000/api/user/findUser?id=${id}`
    );
    const userData = await userRes.json();
    const userName = `${userData.firstName} ${userData.lastName}`;

    if (recipes.length === 0) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (user === undefined) {
      return {
        props: {
          user: null,
          recipes,
          userName,
        },
      };
    }

    return {
      props: {
        user,
        recipes,
        userName,
      },
    };
  }
);
