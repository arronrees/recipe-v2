import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Seo from '../../components/Seo';

export default function SignIn({ crsfToken }) {
  const email = useRef(null);
  const password = useRef(null);

  const [generalError, setGeneralError] = useState(null);

  const router = useRouter();

  async function sendData(e) {
    e.preventDefault();

    setGeneralError(null);

    let user = {
      email: email.current.value,
      password: password.current.value,
    };

    const res = await fetch('/api/auth/signIn', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (data.loggedIn) {
      router.push('/');
    } else if (data.message) {
      setGeneralError(data.message);
    }
  }

  return (
    <Layout>
      <Seo title='Sign In' />
      <Header />
      <form
        onSubmit={sendData}
        className='px-4 py-16 grid gap-4 sm:max-w-lg sm:mx-auto'
      >
        <div>
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
          />
        </div>
        <div>
          <label
            className='block pb-2 font-medium text-gray-500'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
            focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
            ref={password}
            type='password'
            name='password'
            id='password'
          />
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
          Don't have an account? You can sign up
          <Link href='/auth/sign-up'>
            <a className='text-indigo-700'>&nbsp;here.</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
