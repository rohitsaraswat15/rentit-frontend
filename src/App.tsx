// import RentItLogo from './assets/logo/RentIt.png';
import './App.css';
import Navbar from './components/common/Navbar';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRouter';

function App() {
  return (
    <>
     <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
    </>
  );
}

export default App;
