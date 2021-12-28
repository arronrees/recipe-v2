import { withSessionSsr } from '../../utils/iron/withSession';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Menu from '../../components/profile/menu';
import RecipeGrid from '../../components/recipes/RecipeGrid';
import RecipeItem from '../../components/recipes/RecipeItem';

import { useEffect } from 'react';
import { useState } from 'react';

export default function MyRecipes({ user }) {
  const [userRecipes, setUserRecipes] = useState(null);

  async function fetchUserRecipes() {
    const res = await fetch(`/api/recipe/findUserRecipes?userId=${user.id}`);

    const data = await res.json();

    setUserRecipes(data);
  }

  useEffect(() => {
    fetchUserRecipes();
  }, []);

  return (
    <Layout>
      <Seo title='My Details' />
      <Header user={user} />
      <main>
        <Menu />
        <section>
          <h1>
            Welcome, {user.firstName} {user.lastName}
          </h1>
          <RecipeGrid>
            {userRecipes &&
              userRecipes.map((recipe) => (
                <RecipeItem key={recipe.id} recipe={recipe} />
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

    if (user === undefined) {
      return {
        redirect: {
          destination: '/auth/sign-in',
          permanent: false,
        },
      };
    }

    return {
      props: {
        user,
      },
    };
  }
);
