import './App.css';
import Navbar from './components/common/Navbar';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRouter';
import BottomHeader from './components/layout/BottomHeader';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
<<<<<<< Updated upstream
   const location = useLocation();
    const hideNavbar =
    location.pathname.startsWith('/admin-dashboard') ||
    location.pathname.startsWith('/user-dashboard') ||
    location.pathname.startsWith('/myProducts') ||
    location.pathname.startsWith('/post-product');

    const hideBottomNavbar =
    location.pathname.startsWith('/admin-dashboard') ||
    location.pathname.startsWith('/user-dashboard') ||
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/forgetpassword') ||
    location.pathname.startsWith('/setnewpassword');
=======
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/forgotpassword', '/setnewpassword'];
  const hideBottomNavbarPaths = ['/login', '/register', '/forgotpassword', '/setnewpassword'];
>>>>>>> Stashed changes

  const hideNavbar = hideNavbarPaths.some(path => location.pathname.startsWith(path));
  const hideBottomNavbar = hideBottomNavbarPaths.some(path => location.pathname.startsWith(path));

  return (
    <>

      {!hideNavbar && <Navbar />}
      {!hideBottomNavbar && <BottomHeader />}

      <AppRoutes />

    </>
  );
}

export default AppWrapper;
