import { withSessionSsr } from '../../utils/iron/withSession';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Menu from '../../components/profile/menu';

import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function MyDetails({ user }) {
  const router = useRouter();

  const [generalError, setGeneralError] = useState(null);

  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  async function sendUserDetails(e) {
    e.preventDefault();

    setGeneralError(null);

    let userDetails = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      // email: email.current.value,
      id: user.id,
    };

    const res = await fetch('/api/user/updateDetails', {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (data.message === 'User details updated successfully') {
      router.reload();
    } else if (data.firstName) {
      setGeneralError(data.firstName);
    } else if (data.lastName) {
      setGeneralError(data.lastName);
    }
  }

  return (
    <Layout>
      <Seo title='My Details' />
      <Header user={user} />
      <main>
        <section>
          <h1>
            Welcome, {user.firstName} {user.lastName}
          </h1>
          <form
            onSubmit={sendUserDetails}
            className='px-4 py-16 grid gap-4 sm:max-w-lg sm:mx-auto'
          >
            <div>
              <label
                className='block pb-2 font-medium text-gray-500'
                htmlFor='password'
              >
                First Name
              </label>
              <input
                className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
            focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
                ref={firstName}
                type='text'
                name='text'
                id='firstName'
                defaultValue={user.firstName}
              />
            </div>
            <div>
              <label
                className='block pb-2 font-medium text-gray-500'
                htmlFor='password'
              >
                Last Name
              </label>
              <input
                className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
            focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
                ref={lastName}
                type='text'
                name='text'
                id='lastName'
                defaultValue={user.lastName}
              />
            </div>
            {/* <div>
              <label
                className='block pb-2 font-medium text-gray-500'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='block box-border w-full border-2  border-gray-300 border-solid rounded-md p-2 focus:outline-none
            focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
                ref={email}
                type='text'
                name='email'
                id='email'
                defaultValue={user.email}
              />
            </div> */}
            <div>
              <button
                type='submit'
                className='py-2 px-4 transition border border-transparent shadow-sm  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Update Details
              </button>
            </div>
            {generalError && (
              <div className='error text-base text-red-500 font-medium py-2 px-4'>
                {generalError}
              </div>
            )}
          </form>
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
