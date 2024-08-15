import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './routes/Routes';
import AuthProvider from './providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
)
