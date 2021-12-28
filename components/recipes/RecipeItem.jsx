import Image from 'next/image';

export default function RecipeItem({ recipe }) {
  return (
    <div>
      <h1>{recipe.name}</h1>
      <div className='h-56 relative'>
        <figure className='absolute w-full h-full'>
          <Image
            src='/food.jpg'
            alt={recipe.name}
            layout='fill'
            className='object-cover'
          />
        </figure>
      </div>
      <h6>{recipe.userName}</h6>
    </div>
  );
}
