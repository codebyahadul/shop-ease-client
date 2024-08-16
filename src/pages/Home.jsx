import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Home = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-364px)]">
      <div className="w-full flex justify-center bg-white flex-col bg-gradient-to-b from-#52C2FF to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center text-black">
            {/* Text content */}
            <div className="space-y-2">
              <h2 className="text-primary text-xl md:text-6xl font-bold my-5">Shop<span className="text-secondary">Ease</span></h2>
              <p className="mx-auto max-w-[700px] text-sm my-2">
                ShopEase offers a streamlined shopping experience with intuitive navigation and advanced filtering options. Find products quickly with our user-friendly interface and robust search functionality.
              </p>
            </div>
            <div className="flex items-center gap-1 md:gap-3 *:text-xs *:md:text-lg my-2">
              {
                !user && <>
                <Link to='/login' className="rounded-md bg-primary px-2 md:px-4 py-1 text-sm font-medium text-white hover:bg-secondary transition-all duration-300">
                Login
              </Link>
              <Link to='/registration' className="rounded-md bg-primary px-2 md:px-4 py-1 text-sm font-medium text-white hover:bg-secondary transition-all duration-300">
                Registration
              </Link></>
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;