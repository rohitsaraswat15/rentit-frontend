// import RentItLogo from './assets/RentIt.png';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRouter';

function App() {
  return (
    <>
     <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>

    {/* <div className="App" style={{ textAlign: 'center', padding: '2rem' }}> */}
      {/* RentIt Logo */}
      {/* <img
        src={RentItLogo}
        alt="RentIt Logo"
        style={{
          width: '220px',
          maxWidth: '100%',
          marginBottom: '1rem',
        }}
      /> */}
        
      {/* Heading */}
      {/* <h1>Welcome to RentIt Frontend 🚀 by Tanya</h1>
      <h2>Frontend Development</h2>
       */}

      {/* Info Text */}
      {/* <p>This is a live deployed React app.</p>
      <p>
        Welcome to <strong>RentIt</strong>, a <strong>Graviq</strong> product — <em>"Powering the Future of Digital Decisions"</em>
      </p>
    </div> */}
    </>
  );
}

export default App;
