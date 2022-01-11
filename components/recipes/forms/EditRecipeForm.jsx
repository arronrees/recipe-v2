import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function EditRecipeForm({ recipe }) {
  const router = useRouter();

  const [recipeError, setRecipeError] = useState(null);

  const recipeName = useRef(null);
  const recipeImage = useRef(null);
  const recipePrepTime = useRef(null);
  const recipeCookTime = useRef(null);
  const recipeServes = useRef(null);
  const recipeDifficulty = useRef(null);
  const recipeCategories = useRef(null);
  const recipePublic = useRef(null);

  const cs = recipe.categories.map((cat) => cat.name);
  let cats = '';
  cs.forEach((cat) => (cats += `${cat[0].toUpperCase()}${cat.slice(1)}, `));

  async function updateRecipe(e) {
    e.preventDefault();

    setRecipeError(null);

    const c = recipeCategories.current.value.split(',');
    let cats = [];
    c.forEach((cat) => {
      const ca = cat.trim();
      if (ca !== '') {
        cats.push(ca.toLowerCase());
      }
    });

    let updatedRecipe = {
      name: recipeName.current.value,
      image: recipeImage.current.value,
      prepTime: recipePrepTime.current.value,
      cookTime: recipeCookTime.current.value,
      serves: recipeServes.current.value,
      difficulty: recipeDifficulty.current.value,
      public: recipePublic.current.value,
      categories: cats,
    };

    const res = await fetch(`/api/recipe/edit?id=${recipe.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedRecipe),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (data.message === 'Recipe updated successfully') {
      router.push(`/recipes/${recipe.id}`);
    } else if (data.message) {
      setRecipeError(data.message);
    }

    return;
  }

  return (
    <form
      onSubmit={updateRecipe}
      className='px-4 py-8 grid gap-4 sm:max-w-lg sm:mx-auto'
    >
      <div>
        <label
          className='block pb-2 font-medium text-gray-500'
          htmlFor='recipeName'
        >
          Name
        </label>
        <input
          className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
    focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
          ref={recipeName}
          type='text'
          name='recipeName'
          id='recipeName'
          defaultValue={recipe.name}
        />
      </div>
      <div>
        <label
          className='block pb-2 font-medium text-gray-500'
          htmlFor='recipeImage'
        >
          Image
        </label>
        <input
          className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
    focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
          ref={recipeImage}
          type='text'
          name='recipeImage'
          id='recipeImage'
          defaultValue={recipe.image}
        />
      </div>
      <div>
        <label
          className='block pb-2 font-medium text-gray-500'
          htmlFor='recipePublic'
        >
          Prep Time (minutes)
        </label>
        <input
          className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
    focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
          ref={recipePrepTime}
          type='text'
          name='recipePrepTime'
          id='recipePrepTime'
          defaultValue={recipe.prepTime}
        />
      </div>
      <div>
        <label
          className='block pb-2 font-medium text-gray-500'
          htmlFor='recipePublic'
        >
          Cook Time (minutes)
        </label>
        <input
          className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
    focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
          ref={recipeCookTime}
          type='text'
          name='recipeCookTime'
          id='recipeCookTime'
          defaultValue={recipe.cookTime}
        />
      </div>
      <div>
        <label
          className='block pb-2 font-medium text-gray-500'
          htmlFor='recipePublic'
        >
          Serves (people)
        </label>
        <input
          className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
    focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
          ref={recipeServes}
          type='text'
          name='recipeServes'
          id='recipeServes'
          defaultValue={recipe.serves}
        />
      </div>
      <div>
        <label
          className='block pb-2 font-medium text-gray-500'
          htmlFor='recipePublic'
        >
          Difficulty
        </label>
        <select
          className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
    focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
          ref={recipeDifficulty}
          name='recipeDifficulty'
          id='recipeDifficulty'
          defaultValue={recipe.difficulty}
        >
          <option value='easy' defaultValue>
            Easy
          </option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
      </div>
      <div>
        <label
          className='block pb-2 font-medium text-gray-500'
          htmlFor='recipePublic'
        >
          Categories (separate with comma)
        </label>
        <input
          className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
    focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
          ref={recipeCategories}
          type='text'
          name='recipeCategories'
          id='recipeCategories'
          defaultValue={cats}
        />
      </div>
      <div>
        <label
          className='block pb-2 font-medium text-gray-500'
          htmlFor='recipePublic'
        >
          Make Public?
        </label>
        <select
          className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
    focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
          ref={recipePublic}
          name='recipePublic'
          id='recipePublic'
          defaultValue={recipe.public}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>
      <div>
        <button
          type='submit'
          className='py-2 px-4 transition border border-transparent shadow-sm  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Edit recipe
        </button>
      </div>
      {recipeError && (
        <div className='error text-base text-red-500 font-medium py-2 px-4'>
          {recipeError}
        </div>
      )}
    </form>
  );
}
