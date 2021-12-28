import Link from 'next/link';

export default function Menu() {
  return (
    <ul>
      <li>
        <Link href='/profile/my-details'>
          <a>My Details</a>
        </Link>
      </li>
      <li>
        <Link href='/profile/my-recipes'>
          <a>My Recipes</a>
        </Link>
      </li>
      <li>
        <Link href='/profile/saved-recipes'>
          <a>Saved Recipes</a>
        </Link>
      </li>
    </ul>
  );
}
