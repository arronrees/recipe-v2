import { withSessionSsr } from '../../../utils/iron/withSession';

import Layout from '../../../components/Layout';
import Seo from '../../../components/Seo';
import Header from '../../../components/Header';

import EditRecipeForm from '../../../components/recipes/forms/EditRecipeForm';

export default function EditRecipe({ user, recipe }) {
  return (
    <Layout>
      <Seo title='Edit recipe' />
      <Header user={user} />
      <main>
        <section>
          <h1 className='px-4 capitalize text-lg font-semibold text-gray-500'>
            Edit {recipe.name}
          </h1>
          <EditRecipeForm recipe={recipe} />
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res, params }) {
    const user = req.session.user;

    if (user === undefined) {
      return {
        redirect: {
          destination: '/auth/sign-in',
          permanent: false,
        },
      };
    }

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

    if (user.id === recipe.userId) {
      return {
        props: {
          user,
          recipe,
        },
      };
    }

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
);
