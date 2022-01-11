import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RecipeSaveButton from './RecipeSaveButton';

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
    <article className='relative'>
      <div className='h-56 relative'>
        <h1 className='font-semibold text-2xl absolute z-20 w-full bottom-0 p-4 pr-20 text-white'>
          {recipe.name}
        </h1>
        <RecipeSaveButton user={user} recipe={recipe} />
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
