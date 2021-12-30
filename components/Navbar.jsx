import Link from 'next/link';

export default function Navbar({ user }) {
  return (
    <ul className='flex items-center ml-auto'>
      {!user ? (
        <li>
          <Link href='/auth/sign-in'>
            <a className='transition py-2 px-4 border border-transparent shadow-sm  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
              Sign In
            </a>
          </Link>
        </li>
      ) : (
        <>
          <li>
            <Link href='/profile'>
              <a className='mr-4 text-gray-500 font-semibold'>
                {user.firstName} {user.lastName}
              </a>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
