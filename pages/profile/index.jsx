import { withSessionSsr } from '../../utils/iron/withSession';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Menu from '../../components/profile/Menu';
import ProfileHeader from '../../components/profile/ProfileHeader';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Profile({ user }) {
  const router = useRouter();

  const [deleteOpen, setDeleteOpen] = useState(false);

  async function deleteAccount() {
    const res = await fetch(`/api/user/deleteUser?id=${user.id}`, {
      method: 'POST',
    });
    const data = await res.json();

    console.log(data);

    if (data.message === 'User deleted successfully') {
      router.push('/');
    }

    return;
  }

  const handleSignOut = () => {
    fetch('/api/auth/signOut', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        router.push('/');
      });
  };

  return (
    <Layout>
      <Seo title='My Profile' />
      <Header user={user} />
      <main>
        <section>
          <ProfileHeader user={user} />
          <div className='p-4'>
            <Menu />
            <button type='button' onClick={handleSignOut}>
              <a className='block transition py-2 px-4 border border-transparent shadow-sm  font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer mb-4'>
                Sign Out
              </a>
            </button>
            <button
              type='button'
              className='block text-base transition font-semibold text-rose-400 border-b border-rose-400 hover:border-rose-600 hover:text-rose-600'
              onClick={() => {
                setDeleteOpen(!deleteOpen);
              }}
            >
              Delete Account
            </button>
            <div className={`${deleteOpen ? 'block' : 'hidden'} `}>
              <h5 className='py-2'>
                Are you sure? This will delete all your data, including your
                created and saved recipes.
              </h5>
              <button
                type='button'
                className='p-4 py-2 px-4 text-base transition border border-transparent shadow-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600'
                onClick={deleteAccount}
              >
                Yes, please delete my account
              </button>
            </div>
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
