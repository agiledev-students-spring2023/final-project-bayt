import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';

// TODOS:
// 1. The index page is login page right now. Should be set to home page once we have user authentication

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route index path="/" element={<Login />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
