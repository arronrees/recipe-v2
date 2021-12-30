import { withSessionSsr } from '../../utils/iron/withSession';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Menu from '../../components/profile/menu';

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
          <div className='flex items-center justify-between px-8 pb-4'>
            <h1 className='font-bold text-xl text-gray-800'>
              Chef {user.firstName}
            </h1>
            <div className='flex items-center justify-center bg-rose-400 rounded-full w-16 h-16 p-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='#fff'
                viewBox='0 0 16 16'
                className='w-full h-full'
              >
                <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
              </svg>
            </div>
          </div>
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
