import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-5 bg-white">
            <img className="w-[500px] rounded-md" src="https://cdn.dribbble.com/users/718859/screenshots/3267029/jisunpark_404-error.gif" alt="" />
            <Link to="/" className="btn bg-primary hover:bg-secondary text-lg font-bold p-2 rounded-md">Back to Home</Link>
        </div>
    );
};

export default ErrorPage;