import { withSessionSsr } from '../../utils/iron/withSession';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Menu from '../../components/profile/menu';

import { useEffect } from 'react';

export default function MyRecipes({ user }) {
  async function fetchUserRecipes() {
    const res = await fetch(`/api/recipe/find`);

    const data = await res.json();

    console.log(data);
  }

  useEffect(() => {
    fetchUserRecipes();
  }, []);

  return (
    <Layout>
      <Seo title='My Details' />
      <Header user={user} />
      <main>
        <section>
          <h1>
            Welcome, {user.firstName} {user.lastName}
          </h1>
          <div className='grid'></div>
        </section>
        <Menu />
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
