import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Registration from "../pages/Authentication/Registration";
import Login from "../pages/Authentication/Login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
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