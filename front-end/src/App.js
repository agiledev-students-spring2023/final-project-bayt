import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Tasks from './pages/Tasks';

// TODOS:
// 1. The index page is login page right now. Should be set to home page once we have user authentication

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route index path="/" element={<Login />}></Route>
            <Route index path="/tasks" element={<Tasks />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
