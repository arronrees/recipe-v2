import { withSessionSsr } from '../../utils/iron/withSession';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Menu from '../../components/profile/menu';

export default function Profile({ user }) {
  return (
    <Layout>
      <Seo title='My Profile' />
      <Header user={user} />
      <main>
        <section>
          <h1>
            Welcome, {user.firstName} {user.lastName}
          </h1>
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
