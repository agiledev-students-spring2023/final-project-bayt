import './App.css';
import './css/branding.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Finances from './pages/finances';
import Alerts from './pages/alerts';
import Header from './header';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route index path="/tasks" element={<Tasks />} />
          <Route index path="/home" element={<Home />} />
          <Route index path="/Profile" element={<Profile />} />
          <Route index path="/finances" element={<Finances />} />
          <Route index path="/alerts" element={<Alerts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
