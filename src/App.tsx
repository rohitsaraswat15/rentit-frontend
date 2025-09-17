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
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/forgotpassword','/setnewpassword'];
  const hideBottomNavbarPaths = ['/login', '/register', '/forgotpassword','/setnewpassword'];
  const showBottomNavbarPaths = ['/postproduct', '/request','/messages','/settings','/admin-dashboard','/user-dashboard'];
  
  const hideNavbar = hideNavbarPaths.some(path => location.pathname.startsWith(path));
  const hideBottomNavbar = hideBottomNavbarPaths.some(path => location.pathname.startsWith(path));
  const showBottomNavbar = showBottomNavbarPaths.some(path => location.pathname.startsWith(path));
  

  return (
    <>

      {!hideNavbar && <Navbar />}
      {!hideBottomNavbar && <BottomHeader />}
      {showBottomNavbar && <BottomHeader/>}

      <AppRoutes />

    </>
  );
}

export default AppWrapper;
