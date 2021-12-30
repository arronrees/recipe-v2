import { withSessionSsr } from '../../utils/iron/withSession';

import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Seo from '../../components/Seo';

export default function SignUp({ user }) {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [generalError, setGeneralError] = useState(null);

  const router = useRouter();

  async function sendData(e) {
    e.preventDefault();

    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);

    let user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    const res = await fetch('/api/auth/signUp', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (data.loggedIn) {
      router.push('/');
    } else if (data.firstName) {
      setFirstNameError(data.firstName);
    } else if (data.lastName) {
      setLastNameError(data.lastName);
    } else if (data.email) {
      setEmailError(data.email);
    } else if (data.password) {
      setPasswordError(data.password);
    } else if (data.message) {
      setGeneralError(data.message);
    }
  }

  return (
    <Layout>
      <Seo title='Sign Up' />
      <Header user={user} />
      <form
        onSubmit={sendData}
        className='px-4 py-16 grid gap-4 sm:max-w-lg sm:mx-auto'
      >
        <div>
          <label
            htmlFor='firstName'
            className='block pb-2 font-medium text-gray-500'
          >
            First Name
          </label>
          <input
            className='block box-border w-full border-2  border-gray-300 border-solid rounded-md p-2 focus:outline-none
            focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
            ref={firstName}
            type='text'
            name='firstName'
            id='name'
          />
          {firstNameError && (
            <div className='error text-base text-red-500 font-medium py-2 px-4'>
              {firstNameError}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor='lastName'
            className='block pb-2 font-medium text-gray-500'
          >
            Last Name
          </label>
          <input
            className='block box-border w-full border-2  border-gray-300 border-solid rounded-md p-2 focus:outline-none
            focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
            ref={lastName}
            type='text'
            name='lastName'
            id='lastName'
          />
          {lastNameError && (
            <div className='error text-base text-red-500 font-medium py-2 px-4'>
              {lastNameError}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor='email'
            className='block pb-2 font-medium text-gray-500'
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
          />
          {emailError && (
            <div className='error text-base text-red-500 font-medium py-2 px-4'>
              {emailError}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor='password'
            className='block pb-2 font-medium text-gray-500'
          >
            Password
          </label>
          <input
            className='block box-border w-full border-2  border-gray-300 border-solid rounded-md p-2 focus:outline-none
            focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
            ref={password}
            type='password'
            name='password'
            id='password'
          />
          {passwordError && (
            <div className='error text-base text-red-500 font-medium py-2 px-4'>
              {passwordError}
            </div>
          )}
        </div>
        <div>
          <button
            type='submit'
            className='py-2 px-4 transition border border-transparent shadow-sm  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Submit
          </button>
        </div>
        {generalError && (
          <div className='error text-base text-red-500 font-medium py-2 px-4'>
            {generalError}
          </div>
        )}
      </form>
      <div>
        <p className='text-center text-gray-600 font-medium px-4'>
          Already have an account? You can sign in
          <Link href='/auth/sign-in'>
            <a className='text-indigo-700'>&nbsp;here.</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;

    if (user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: null,
      },
    };
  }
);
