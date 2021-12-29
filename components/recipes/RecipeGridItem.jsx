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
        <div className='absolute text-white bottom-4 left-4 z-20'>
          <h3 className='pb-2 text-2xl font-semibold capitalize'>
            {recipe.name}
          </h3>
          <section className='flex gap-4'>
            <div className='flex items-center justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='mr-2 text-cyan-500'
                viewBox='0 0 16 16'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z' />
              </svg>
              <p>{recipe.totalTime} mins</p>
            </div>
            <div className='flex items-center justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='mr-2 text-cyan-500'
                viewBox='0 0 16 16'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z' />
              </svg>
              <p className='capitalize'>{recipe.difficulty}</p>
            </div>
          </section>
        </div>
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
