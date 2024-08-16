import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layout/MainLayout";
import Registration from "../pages/Authentication/Registration";
import Login from "../pages/Authentication/Login";
import Product from "../pages/Product";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/products',
                element: <PrivateRoute><Product /></PrivateRoute>,
                loader: () => fetch(`${import.meta.env.VITE_URL}/productCount`)
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/registration',
                element: <Registration />
            }
        ]
    }
])

export default router;