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

  async function saveRecipe(save) {
    let data;

    if (save) {
      const res = await fetch(
        `/api/recipe/save?userId=${user.id}&recipeId=${recipe.id}`,
        { method: 'PUT' }
      );
      data = await res.json();
    } else {
      const res = await fetch(
        `/api/recipe/unSave?userId=${user.id}&recipeId=${recipe.id}`,
        { method: 'PUT' }
      );
      data = await res.json();
    }

    if (data) {
      router.push(`/recipes/${recipe.id}`);
    }

    return;
  }

  return (
    <article className='relative'>
      <div className='h-56 relative'>
        <h1 className='font-semibold text-2xl absolute z-20 w-full bottom-0 p-4 pr-20 text-white'>
          {recipe.name}
        </h1>
        {user && user.savedRecipes && user.savedRecipes.includes(recipe.id) ? (
          <button
            type='button'
            className='absolute z-20 bottom-4 right-4 bg-rose-500 p-2 w-10 h-10 rounded-md hover:bg-rose-600 active:bg-rose-700 transition'
            onClick={() => saveRecipe(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='#fff'
              className='w-full h-full'
              viewBox='0 0 16 16'
            >
              <path d='M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z' />
              <path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z' />
            </svg>
          </button>
        ) : (
          <button
            type='button'
            className='absolute z-20 bottom-4 right-4 bg-rose-500 p-2 w-10 h-10 rounded-md hover:bg-rose-600 active:bg-rose-700 transition'
            onClick={() => saveRecipe(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='#fff'
              className='w-full h-full'
              viewBox='0 0 16 16'
            >
              <path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z' />
              <path d='M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z' />
            </svg>
          </button>
        )}
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
        <div className='flex justify-end text-white p-2 absolute top-0 right-0 z-20'>
          <Link href={`/recipes/edit/${recipe.id}`}>
            <a className='rounded-md px-4 py-2 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 transition shadow-sm'>
              Edit
            </a>
          </Link>
          <button
            type='button'
            className='ml-2 rounded-md px-4 py-2 bg-red-700 hover:bg-red-800 active:bg-red-900 transition shadow-sm'
            onClick={deleteRecipe}
          >
            Delete
          </button>
        </div>
      )}
      <section className='p-4'>
        <h6 className='text-gray-500 text-sm mb-2'>
          <span>By </span>
          <Link href={`/recipes/user/${recipe.userId}`}>
            <a className='font-semibold text-rose-500 border-b border-solid border-transparent transition hover:border-rose-600'>
              {recipe.userName}
            </a>
          </Link>
        </h6>
        <div className='flex'>
          {recipe.categories.map((cat) => (
            <Link href={`/recipes/category/${cat.id}`} key={cat.id}>
              <a className='block capitalize mr-2 text-gray-400 text-sm transition border-b hover:border-gray-600 hover:text-gray-600'>
                #{cat.name}
              </a>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
