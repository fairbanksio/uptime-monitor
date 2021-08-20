import {
  Link
} from 'react-router-dom';

function Landing() {
  return (
  <div className="App">
  <header className="App-header">
    <img src="/images/logo.svg" className="App-logo" alt="logo" />
    <a
      className="App-link"
      href="/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Uptime monitor
      
    </a>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
  </header>
  
  
  </div>
  );
}
export default Landing;