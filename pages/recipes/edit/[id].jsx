import { withSessionSsr } from '../../../utils/iron/withSession';

import Layout from '../../../components/Layout';
import Seo from '../../../components/Seo';
import Header from '../../../components/Header';

import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function EditRecipe({ user, recipe }) {
  const router = useRouter();

  const [recipeError, setRecipeError] = useState(null);

  const recipeName = useRef(null);
  const recipeImage = useRef(null);
  const recipePublic = useRef(null);

  async function updateRecipe(e) {
    e.preventDefault();

    let updatedRecipe = {
      name: recipeName.current.value,
      image: recipeImage.current.value,
      public: recipePublic.current.value,
    };

    const res = await fetch(`/api/recipe/edit?id=${recipe.id}`, {
      method: 'POST',
      body: JSON.stringify(updatedRecipe),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (data.message === 'Recipe updated successfully') {
      router.reload();
    } else if (data.message) {
      setRecipeError(data.message);
    }

    return;
  }

  return (
    <Layout>
      <Seo title='Add recipe' />
      <Header user={user} />
      <main>
        <section>
          <h1>Edit {recipe.name}</h1>
          <form
            onSubmit={updateRecipe}
            className='px-4 py-16 grid gap-4 sm:max-w-lg sm:mx-auto'
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
                Make Public?
              </label>
              <select
                className='block box-border w-full border-2 border-gray-300 border-solid rounded-md p-2 focus:outline-none
            focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
                ref={recipePublic}
                type='password'
                name='recipePublic'
                id='recipePublic'
              >
                {recipe.public ? (
                  <>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </>
                ) : (
                  <>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </>
                )}
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
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res, params }) {
    const user = req.session.user;

    if (user === undefined) {
      return {
        redirect: {
          destination: '/auth/sign-in',
          permanent: false,
        },
      };
    }

    const { id } = params;

    const data = await fetch(
      `http://localhost:3000/api/recipe/findSingleRecipe?id=${id}`
    );
    const recipe = await data.json();

    if (data.status === 400) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (user.id === recipe.userId) {
      return {
        props: {
          user,
          recipe,
        },
      };
    }

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
);