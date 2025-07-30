// import RentItLogo from './assets/logo/RentIt.png';
import './App.css';
import Navbar from './components/common/Navbar';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRouter';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
   const location = useLocation();
    const hideNavbar =
    location.pathname.startsWith('/admin-dashboard') ||
    location.pathname.startsWith('/user-dashboard') ||
    location.pathname.startsWith('/myProducts') ||
    location.pathname.startsWith('/post-product');


  return (
    <>
     
       {!hideNavbar && <Navbar />}
      <AppRoutes />
   
    </>
  );
}

export default AppWrapper;
