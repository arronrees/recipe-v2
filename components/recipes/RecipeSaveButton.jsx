import { useRouter } from 'next/router';

export default function RecipeSaveButton({ user, recipe }) {
  const router = useRouter();

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

  if (!user) {
    return null;
  }

  console.log(user);

  if (user.savedRecipes && user.savedRecipes.includes(recipe.id)) {
    return (
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
    );
  } else {
    return (
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
    );
  }
}
