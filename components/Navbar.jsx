import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar({ user }) {
  const router = useRouter();

  const handleSignOut = () => {
    fetch('/api/auth/signOut', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        router.reload();
      });
  };

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
        <li onClick={handleSignOut}>
          <a className='transition py-2 px-4 border border-transparent shadow-sm  font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer'>
            Sign Out
          </a>
        </li>
      )}
    </ul>
  );
}
