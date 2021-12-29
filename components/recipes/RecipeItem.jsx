import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function RecipeItem({ recipe, user }) {
  const router = useRouter();

  async function deleteRecipe() {
    const res = await fetch(`/api/recipe/delete?id=${recipe.id}`, {
      method: 'DELETE',
    });
    const data = await res.json();

    if (data.message === 'Recipe deleted successfully') {
      router.push('/');
    }

    return;
  }

  return (
    <article>
      <div className='h-56 relative'>
        <h1 className='font-semibold text-2xl absolute z-20 w-full bottom-0 p-4 text-white'>
          {recipe.name}
        </h1>
        <figure className='absolute w-full h-full'>
          <Image
            src='/food.jpg'
            alt={recipe.name}
            layout='fill'
            className='object-cover'
          />
        </figure>
        <div
          className='absolute z-10 w-full h-full'
          style={{
            background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8))',
          }}
        ></div>
      </div>

      {user && user.id === recipe.userId && (
        <div className='flex justify-end items-center text-white p-2'>
          <Link href={`/recipes/edit/${recipe.id}`}>
            <a className='rounded-md px-4 py-2 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 transition'>
              Edit
            </a>
          </Link>
          <button
            type='button'
            className='ml-2 rounded-md px-4 py-2 bg-red-700 hover:bg-red-800 active:bg-red-900 transition'
            onClick={deleteRecipe}
          >
            Delete
          </button>
        </div>
      )}
      <h6>{recipe.userName}</h6>
    </article>
  );
}
