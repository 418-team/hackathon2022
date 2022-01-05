import logo from './logo.svg';
import './App.css';
import authentication from "./components/authentication";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage/>} exact />
                    <Route path="/authentication" element={<authentication/>} exact />
                </Routes>
            </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
