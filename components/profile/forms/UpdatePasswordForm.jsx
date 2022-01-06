import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function UpdatePasswordForm({ user }) {
  const router = useRouter();

  const [passwordError, setPasswordError] = useState(null);

  const currPassword = useRef(null);
  const newPassword = useRef(null);

  async function sendPassword(e) {
    e.preventDefault();

    setPasswordError(null);

    let password = {
      currPassword: currPassword.current.value,
      newPassword: newPassword.current.value,
      id: user.id,
    };

    const res = await fetch('/api/user/updatePassword', {
      method: 'POST',
      body: JSON.stringify(password),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (data.message === 'Password updated successfully') {
      toast.success(data.message);
      router.push('/profile/my-details');
    } else if (data.currPassword) {
      setPasswordError(data.currPassword);
    } else if (data.newPassword) {
      setPasswordError(data.newPassword);
    }

    return;
  }

  return (
    <form
      onSubmit={sendPassword}
      className='py-4 grid gap-4 sm:max-w-lg sm:mx-auto'
    >
      <div>
        <label
          className='block pb-2 font-medium text-gray-500'
          htmlFor='currPassword'
        >
          Current Password
        </label>
        <input
          className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
          ref={currPassword}
          type='password'
          name='currPassword'
          id='currPassword'
          defaultValue=''
        />
      </div>
      <div>
        <label
          className='block pb-2 font-medium text-gray-500'
          htmlFor='newPassword'
        >
          New Password
        </label>
        <input
          className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
          ref={newPassword}
          type='password'
          name='newPassword'
          id='newPassword'
          defaultValue=''
        />
      </div>
      <div>
        <button
          type='submit'
          className='py-2 px-4 transition border border-transparent shadow-sm  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Update Password
        </button>
      </div>
      {passwordError && (
        <div className='error text-base text-red-500 font-medium py-2 px-4'>
          {passwordError}
        </div>
      )}
    </form>
  );
}
