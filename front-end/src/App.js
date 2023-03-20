import './App.css';
import './css/branding.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Header from './pages/Header';
import Footer from './pages/Footer';

// TODOS:
// 1. The index page is login page right now. Should be set to home page once we have user authentication

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <div className="Test">
            <Header />
          </div>
          <div className="App-main">
            <Routes>
              <Route index path="/" element={<Login />}></Route>
              <Route index path="/tasks" element={<Tasks />}></Route>
              <Route index path="/home" element={<Home />}></Route>
              <Route index path="/Profile" element={<Profile/>}></Route>
            </Routes>
          </div>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
