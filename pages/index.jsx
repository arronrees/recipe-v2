import { withSessionSsr } from '../utils/iron/withSession';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Header from '../components/Header';
import RecipeGrid from '../components/recipes/RecipeGrid';
import RecipeGridItem from '../components/recipes/RecipeGridItem';

export default function Home({ user, recipes }) {
  return (
    <Layout>
      <Seo />
      <Header user={user} />
      <main>
        <h1>All recipes</h1>
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
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;

    const data = await fetch(`http://localhost:3000/api/recipe/findAllRecipes`);
    const recipes = await data.json();

    if (user === undefined) {
      return {
        props: {
          user: null,
          recipes,
        },
      };
    }

    return {
      props: {
        user,
        recipes,
      },
    };
  }
);
