import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

export default function Layout({ children }) {
  if (typeof window !== 'undefined') {
    injectStyle();
  }

  return (
    <div className='pb-16 font-body leading-normal tracking-wider relative'>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {children}
    </div>
  );
}
