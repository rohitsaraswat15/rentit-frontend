
import RentItLogo from './assets/RentIt.png';
import './App.css';

function App() {
  return (
    <div className="App" style={{ textAlign: 'center', padding: '2rem' }}>
      {/* RentIt Logo */}
      <img
        src={RentItLogo}
        alt="RentIt Logo"
        style={{
          width: '220px',
          maxWidth: '100%',
          marginBottom: '1rem',
        }}
      />

     

      {/* Heading */}
      <h1>Welcome to RentIt Frontend 🚀</h1>

      {/* Info Text */}
      <p>This is a live deployed React app.</p>
      <p>
        Welcome to <strong>RentIt</strong>, a <strong>Graviq</strong> product — <em>"Powering the Future of Digital Decisions"</em>
      </p>
    </div>
  );
}

export default App;
