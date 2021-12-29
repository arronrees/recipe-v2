import Image from 'next/image';
import Link from 'next/link';

export default function RecipeItem({ recipe, user }) {
  return (
    <article>
      <div className='h-56 relative'>
        <div className='flex justify-between items-center absolute z-20 w-full bottom-0 p-4 text-white'>
          <h1 className='font-semibold text-2xl'>{recipe.name}</h1>
          {user && user.id === recipe.userId && (
            <Link href='/'>
              <a className='rounded-md px-4 py-2 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 transition'>
                Edit
              </a>
            </Link>
          )}
        </div>
        <figure className='absolute w-full h-full'>
          <Image
            src='/food.jpg'
            alt={recipe.name}
            layout='fill'
            className='object-cover'
          />
        </figure>
        <div
          className='absolute z-10 w-full h-full rounded-md'
          style={{
            background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8))',
          }}
        ></div>
      </div>
      <h6>{recipe.userName}</h6>
    </article>
  );
}
