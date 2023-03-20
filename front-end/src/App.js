import './App.css';
import './css/branding.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Home from './pages/Home';
import IndividualTask from './pages/IndividualTask';
import Profile from './pages/Profile';

// TODOS:
// 1. The index page is login page right now. Should be set to home page once we have user authentication
// 2. Add slug to individual task page

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />}></Route>
            <Route index path="/tasks" element={<Tasks />}></Route>
            <Route index path="/home" element={<Home />}></Route>
            <Route index path="/tasks/add" element={<IndividualTask />}></Route>
            <Route index path="/Profile" element={<Profile/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
