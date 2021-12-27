import { withSessionSsr } from '../utils/iron/withSession';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Header from '../components/Header';

export default function Home({ user }) {
  return (
    <Layout>
      <Seo />
      <Header user={user} />
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;

    if (user === undefined) {
      return {
        props: {
          user: null,
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
