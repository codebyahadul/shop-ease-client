import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [dropDownState, setDropDownState] = useState(false);
    const dropDownMenuRef = useRef();

    useEffect(() => {
        const closeDropDown = (e) => {
            if (!dropDownMenuRef?.current?.contains(e?.target)) {
                setDropDownState(false);
            }
        };

        document.addEventListener('mousedown', closeDropDown);

        return () => {
            document.removeEventListener('mousedown', closeDropDown);
        };
    }, []);
    const span = () => {
        return <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-secondary transition-all duration-300 group-hover:w-full"></span>
    }
    const links = <>
        <li>
            <NavLink to='/' className={({ isActive }) =>
                isActive
                    ? "group flex cursor-pointer flex-col text-primary text-sm md:text-lg font-semibold"
                    : "group flex cursor-pointer flex-col text-secondary text-sm md:text-lg"
            }>
                Home {span()}</NavLink>
        </li>
        <li>
            <NavLink to='/services' className={({ isActive }) =>
                isActive
                    ? "group flex cursor-pointer flex-col text-primary text-sm md:text-lg"
                    : "group flex cursor-pointer flex-col text-secondary text-sm md:text-lg"
            }>
                Services {span()}</NavLink>
        </li>
        <li>
            <NavLink to='/services' className={({ isActive }) =>
                isActive
                    ? "group flex cursor-pointer flex-col text-primary text-sm md:text-lg"
                    : "group flex cursor-pointer flex-col text-secondary text-sm md:text-lg"
            }>
                About {span()}</NavLink>
        </li>
        <li>
            <NavLink to='/services' className={({ isActive }) =>
                isActive
                    ? "group flex cursor-pointer flex-col text-primary text-sm md:text-lg"
                    : "group flex cursor-pointer flex-col text-secondary text-sm md:text-lg"
            }>
                Blogs {span()}</NavLink>
        </li>
    </>
    return (
        <nav className="flex items-center justify-between py-2 my-3 max-w-7xl mx-auto">
            <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl md:text-3xl font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-3">
                {/* menu bar */}
                <div ref={dropDownMenuRef} onClick={() => setDropDownState(!dropDownState)} className="relative flex transition-transform md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer" > <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /> </svg>
                    {dropDownState && (
                        <ul className=" z-10 gap-2 bg-[#393E46] absolute -right-28 top-11 flex w-[150px] flex-col rounded-lg   text-base text-center space-y-1">
                            {links}
                        </ul>
                    )}
                </div>
                <h2 className="text-primary">Shop<span className="text-secondary">Ease</span></h2>
            </div>
            <ul className="hidden items-center justify-between gap-10 md:flex">
                {links}
            </ul>
            <div className="flex items-center gap-1 md:gap-3 *:text-xs *:md:text-lg">
                <Link to='/login' className="rounded-md bg-primary px-2 md:px-4 py-1 text-sm font-medium text-white hover:bg-secondary transition-all duration-300">
                    Login
                </Link>
                <Link to='/registration' className="rounded-md bg-primary px-2 md:px-4 py-1 text-sm font-medium text-white hover:bg-secondary transition-all duration-300">
                    Registration
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;