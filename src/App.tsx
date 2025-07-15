import RentItLogo from './assets/logo/RentIt.png';
import './App.css';
import Navbar from './components/common/Navbar';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRouter';
import Footer from './components/layout/footer/Footer';

function App() {
  return (
    <>
     <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>

    <div className="App" style={{ textAlign: 'center', padding: '2rem' }}>
      {/* RentIt Logo */}
      <img className='w-50 h-50 m-auto'
        src={RentItLogo}
        alt="RentIt Logo"
      />
        
      {/* Heading */}
      <h1>Welcome to RentIt Frontend 🚀 by Tanya</h1>
      <h2>Frontend Development</h2>
      

      {/* Info Text */}
      <p>This is a live deployed React app.</p>
      <p>
        Welcome to <strong>RentIt</strong>, a <strong>Graviq</strong> product — <em>"Powering the Future of Digital Decisions"</em>
      </p>
    </div>
    <Footer/>
    </>
  );
}

export default App;
