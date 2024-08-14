import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <div className="text-5xl font-bold">this is Nav</div>
            <Outlet />
            <div>this is footer</div>
        </>
    );
};

export default MainLayout;