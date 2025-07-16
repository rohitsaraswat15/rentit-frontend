// import RentItLogo from './assets/logo/RentIt.png';
import './App.css';
import Navbar from './components/common/Navbar';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRouter';
import HomePage from './pages/admin/HomePage';

function App() {
  return (
    <>
     <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
    
    <HomePage/>
    </>
  );
}

export default App;
