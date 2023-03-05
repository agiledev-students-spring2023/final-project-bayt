import './App.css';

import './css/branding.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Home from './pages/Home';
import Profile from './pages/Profile';

// TODOS:
// 1. The index page is login page right now. Should be set to home page once we have user authentication
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Finances from './finances';

// TODOS:
// 1. The index page is login page right now. Should be set to home page once we have user authentication

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
        <Header />
      <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />}></Route>
            <Route index path="/tasks" element={<Tasks />}></Route>
            <Route index path="/home" element={<Home />}></Route>
            <Route index path="/Profile" element={<Profile/>}></Route>
          </Routes>
      </BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />}></Route>
            <Route index path="/finances" element={<Finances />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
