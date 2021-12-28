import { withSessionSsr } from '../../utils/iron/withSession';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import RecipeItem from '../../components/recipes/RecipeItem';

export default function Add({ user, recipe }) {
  return (
    <Layout>
      <Seo title='Add recipe' />
      <Header user={user} />
      <main>
        <section>
          <h1>View recipe</h1>
          <RecipeItem recipe={recipe} />
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
      `http://localhost:3000/api/recipe/findSingleRecipe?id=${id}`
    );
    const recipe = await data.json();

    if (data.status === 400) {
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
          recipe,
        },
      };
    }

    return {
      props: {
        user,
        recipe,
      },
    };
  }
);
