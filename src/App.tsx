import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import '@/styles/components.css';
import { AuthProvider } from '@/context/AuthContext';
import router from '@/router';
function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            // TODO: make this better later
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
