import { withSessionSsr } from '../../utils/iron/withSession';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Menu from '../../components/profile/Menu';
import ProfileHeader from '../../components/profile/ProfileHeader';

import UpdateDetailsForm from '../../components/profile/forms/UpdateDetailsForm';
import UpdatePasswordForm from '../../components/profile/forms/UpdatePasswordForm';

export default function MyDetails({ user }) {
  return (
    <Layout>
      <Seo title='My Details' />
      <Header user={user} />
      <main>
        <section>
          <ProfileHeader user={user} />
          <div className='p-4'>
            <Menu />
            <UpdateDetailsForm user={user} />
            <UpdatePasswordForm user={user} />
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

    return {
      props: {
        user,
      },
    };
  }
);
