import Link from 'next/link';
import { useState } from 'react';

import Navbar from './Navbar';
import NavMenu from './NavMenu';

export default function Header({ user }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className='flex items-center justify-between p-4 relative'>
      <h1 className='font-title'>
        <Link href='/'>
          <a>Recipes</a>
        </Link>
      </h1>
      <NavMenu navOpen={navOpen} setNavOpen={setNavOpen} user={user} />
      <Navbar user={user} />
      <button
        type='button'
        className='cursor-pointer text-gray-500 ml-4'
        onClick={() => {
          setNavOpen(true);
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          viewBox='0 0 16 16'
          className='w-8 h-8 pointer-events-none'
        >
          <path
            fillRule='evenodd'
            d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
          />
        </svg>
      </button>
    </header>
  );
}
