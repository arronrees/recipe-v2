import Link from 'next/link';

export default function NavMenu({ navOpen, setNavOpen }) {
  return (
    <nav
      className={`text-gray-700 bg-gray-100 absolute w-10/12 h-screen top-0 left-0 sm:w-9/12 md:w-8/12 shadow-2xl transform transition duration-500 z-20 
       ${navOpen ? 'translate-x-0' : '-translate-x-full'} `}
    >
      <button
        type='button'
        className='text-gray-500 absolute top-4 left-3'
        onClick={() => {
          setNavOpen(false);
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          viewBox='0 0 16 16'
          className='w-10 h-10 pointer-events-none'
        >
          <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
        </svg>
      </button>
      <ul className='px-4 pt-24'>
        <li className='font-semibold'>
          <Link href='/user'>
            <a>My Account</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
