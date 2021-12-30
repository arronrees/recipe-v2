import Link from 'next/link';

export default function Menu() {
  return (
    <ul className='grid gap-4 pb-8'>
      <li>
        <Link href='/recipes/add'>
          <a className='block p-4 border-b border-gray-300 font-semibold text-gray-600 hover:text-gray-800 hover:border-gray-700 transition duration-300'>
            Add Recipe
          </a>
        </Link>
      </li>
      <li>
        <Link href='/profile/my-details'>
          <a className='block p-4 border-b border-gray-300 font-semibold text-gray-600 hover:text-gray-800 hover:border-gray-700 transition duration-300'>
            My Details
          </a>
        </Link>
      </li>
      <li>
        <Link href='/profile/my-recipes'>
          <a className='block p-4 border-b border-gray-300 font-semibold text-gray-600 hover:text-gray-800 hover:border-gray-700 transition duration-300'>
            My Recipes
          </a>
        </Link>
      </li>
      <li>
        <Link href='/profile/saved-recipes'>
          <a className='block p-4 border-b border-gray-300 font-semibold text-gray-600 hover:text-gray-800 hover:border-gray-700 transition duration-300'>
            Saved Recipes
          </a>
        </Link>
      </li>
    </ul>
  );
}
