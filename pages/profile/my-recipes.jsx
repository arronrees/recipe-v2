import { withSessionSsr } from '../../utils/iron/withSession';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Menu from '../../components/profile/Menu';
import ProfileHeader from '../../components/profile/ProfileHeader';
import RecipeGrid from '../../components/recipes/RecipeGrid';
import RecipeGridItem from '../../components/recipes/RecipeGridItem';

export default function MyRecipes({ user, recipes }) {
  return (
    <Layout>
      <Seo title='My Details' />
      <Header user={user} />
      <main>
        <section>
          <ProfileHeader user={user} />
          <div className='p-4'>
            <Menu />
            <RecipeGrid>
              {recipes &&
                recipes.map((recipe) => (
                  <RecipeGridItem key={recipe.id} recipe={recipe} />
                ))}
            </RecipeGrid>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;

    if (user === undefined) {
      return {
        redirect: {
          destination: '/auth/sign-in',
          permanent: false,
        },
      };
    }

    try {
      const data = await fetch(
        `http://localhost:3000/api/recipe/findUserRecipes?userId=${user.id}`
      );
      const recipes = await data.json();

      return {
        props: {
          user,
          recipes,
        },
      };
    } catch (err) {
      return {
        props: {
          user,
        },
      };
    }
  }
);
