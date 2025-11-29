import { Home } from 'lucide-react';
import Button from '../../ui/Button';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useLogout } from '../../hooks/useAuth';

const Header = () => {
  const { token ,user} = useAuth();
    const { mutate: logout } = useLogout();
  
  const navigate = useNavigate()
  const handleLogout = () => {
    if (user?.userId) {
      logout(user.userId, {
        onSuccess: () => {
          toast('Logged out successfully');
          setTimeout(() => navigate('/'), 900);
        },
      });
    }
  };
  return (
    <>
      <header className="flex justify-between bg-white shadow-sm border-b border-gray-200 sticky z-50 top-0 p-2">
        {/* left => logo */}
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white rounded-lg p-2 mr-3">
                <Home color="white" className="text-lg md:text-xl" />
              </div>
              <h1 className="text-sm md:text-xl font-bold text-gray-900">First Estate</h1>
            </div>
          </div>
        </div>

        {/* right => login & signup */}
        <div className="w-fit flex justify-center items-center gap-3 px-4 sm:px-6 lg:px-8">
          <>
            {!token ? (
              <>
                <Button children={'Login'} to="/login" className="text-sm p-2 md:text-lg " />
                <Button children={'SignUp'} to="/signup" className="text-sm p-2 md:text-lg " />
              </>
            ) : (
              <Button children={'LogOut'} className="text-sm p-2 md:text-lg " onClick={handleLogout}/>

            )}
          </>

        </div>
      </header>
    </>
  );
};
export default Header;
