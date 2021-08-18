import './App.css';

function App() {
  const apiUrl = process.env.REACT_APP_API || "/api" //assume api is on the same host as web app unless overridden for development
  return (
    <div className="App">
      <header className="App-header">
        <img src="/images/logo.svg" className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://github.com/Fairbanks-io/uptime-monitor"
          target="_blank"
          rel="noopener noreferrer"
        >
          Uptime monitor
        </a>
        <span>API Endpoint:  {apiUrl}</span>
      </header>
      
    </div>
  );
}

export default App;
