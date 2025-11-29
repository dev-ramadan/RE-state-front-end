import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';
import Header from '../components/header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
    </>
  );
};
export default Layout;
