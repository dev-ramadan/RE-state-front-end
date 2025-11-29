import { FiHeart, FiHome, FiSearch } from 'react-icons/fi';
import { IoIosAdd } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx';
import { NavLink } from 'react-router';

interface IProps {}

const Nav = ({}: IProps) => {
  return (
    <>
      <nav className="shadow-2xl p-3 fixed bottom-0 z-50 w-full border-t-2 border-gray-300">
        <ul className="flex justify-around">
          <NavLink to={'/'}>
            <li>
              <div className="flex flex-col items-center justify-center">
                <span className="text-xl md:text-2xl">
                  <FiHome />
                </span>
                <p>Home</p>
              </div>
            </li>
          </NavLink>

          <NavLink to={'/search'}>
            <li className="">
              <div className="flex flex-col items-center justify-center">
                <span className="text-xl md:text-2xl">
                  <FiSearch />
                </span>
                <p>Search</p>
              </div>
            </li>
          </NavLink>

          <NavLink to={'/add'}>
            <li>
              <div className="flex flex-col items-center justify-center">
                <span className="text-xl md:text-2xl">
                  <IoIosAdd />
                </span>
                <p>Add</p>
              </div>
            </li>
          </NavLink>

          <NavLink to={'/saved'}>
            <li>
              <div className="flex flex-col items-center justify-center ">
                <span className="text-xl md:text-2xl">
                  <FiHeart />
                </span>
                <p>Saved</p>
              </div>
            </li>
          </NavLink>

          <NavLink to={'/profile'}>
            <li>
              <div className="flex flex-col items-center justify-center ">
                <span className="text-xl md:text-2xl">
                  <RxAvatar />
                </span>
                <p>Profile</p>
              </div>
            </li>
          </NavLink>
        </ul>
      </nav>
    </>
  );
};
export default Nav;
