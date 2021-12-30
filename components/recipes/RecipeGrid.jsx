export default function RecipeGrid({ children }) {
  return (
    <div className='grid p-4 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:grid-cols-4 2xl:grid-cols-5'>
      {children}
    </div>
  );
}
