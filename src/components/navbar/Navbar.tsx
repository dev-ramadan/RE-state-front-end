import { Heart, House, Plus, Search, UserRound } from 'lucide-react';
import { NavLink } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth()
  
  return (
    <>
      <nav className="shadow-md fixed bottom-0 border-2 border-gray-200 z-50 w-full bg-white">
        <ul className="w-full flex justify-around items-center p-3 ">
          <NavLink to={'/'}>
            <div className="flex justify-center items-center flex-col-reverse">
              <h3>Home</h3>
              <span>
                <House />
              </span>
            </div>
          </NavLink>

          <NavLink to={'/search'}>
            <div className="flex justify-center items-center flex-col-reverse">
              <h3>Search</h3>
              <span>
                <Search />
              </span>
            </div>
          </NavLink>
          {user==null || user?.role == "Agent" ?
            <NavLink to={'/add'}>
              <div className="flex justify-center items-center flex-col-reverse">
                <h3>Add</h3>
                <span>
                  <Plus />
                </span>
              </div>
            </NavLink>
            :''
          }

          <NavLink to={'/wishList'}>
            <div className="flex justify-center items-center flex-col-reverse">
              <h3>Wish List</h3>
              <span>
                <Heart />
              </span>
            </div>
          </NavLink>

          <NavLink to={'/profile'}>
            <div className="flex justify-center items-center flex-col-reverse">
              <h3>Profile</h3>
              <span>
                <UserRound />
              </span>
            </div>
          </NavLink>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
