import { withSessionSsr } from '../../../utils/iron/withSession';

import Layout from '../../../components/Layout';
import Seo from '../../../components/Seo';
import Header from '../../../components/Header';
import RecipeGrid from '../../../components/recipes/RecipeGrid';
import RecipeGridItem from '../../../components/recipes/RecipeGridItem';

export default function CategoryRecipes({ user, recipes, category }) {
  return (
    <Layout>
      <Seo />
      <Header user={user} />
      <main>
        <h1 className='px-4 capitalize text-xl font-semibold text-gray-500'>
          #{category.name}
        </h1>
        <section>
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
      `http://localhost:3000/api/recipe/findCategoryRecipes?catId=${id}`
    );
    const rs = await data.json();
    const recipes = await rs.recipes;

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
          category: rs.cat,
        },
      };
    }

    return {
      props: {
        user,
        recipes,
        category: rs.cat,
      },
    };
  }
);
