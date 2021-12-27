import Head from 'next/head';

export default function Seo({ title, description }) {
  return (
    <Head>
      <title>{title ? `${title} | Recipe App` : 'Recipe App'}</title>
      <meta
        name={description ? description : 'Recipe App default description'}
        content=''
      />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}
