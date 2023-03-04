import './App.css';
import Header from "./header";
import './css/branding.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Home from './pages/Home';
import Profile from './pages/Profile';

// TODOS:
// 1. The index page is login page right now. Should be set to home page once we have user authentication
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Finances from "./finances";

function App() {
  return (
    <div className="App">
      <Router>
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
          <Route path="./finances" element={<Finances />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
