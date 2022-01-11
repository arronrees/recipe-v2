import { withSessionSsr } from '../../utils/iron/withSession';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';

import AddRecipeForm from '../../components/recipes/forms/AddRecipeForm';

export default function AddRecipe({ user }) {
  return (
    <Layout>
      <Seo title='Add recipe' />
      <Header user={user} />
      <main>
        <section>
          <h1 className='px-4 capitalize text-xl font-semibold text-gray-500'>
            Add recipe
          </h1>
          <AddRecipeForm user={user} />
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
