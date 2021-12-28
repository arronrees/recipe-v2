import Link from 'next/link';
import Image from 'next/image';

export default function RecipeGridItem({ recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <a className='block relative h-56 group rounded-md'>
        <figure className='absolute w-full h-full rounded-md overflow-hidden'>
          <Image
            src='/food.jpg'
            alt={recipe.name}
            layout='fill'
            className='object-cover rounded-md transition duration-300 group-hover:scale-105'
          />
        </figure>
        <h3 className='absolute text-white bottom-4 left-4 text-2xl z-20'>
          {recipe.name}
        </h3>
        <div
          className='absolute z-10 w-full h-full rounded-md'
          style={{
            background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8))',
          }}
        ></div>
      </a>
    </Link>
  );
}
