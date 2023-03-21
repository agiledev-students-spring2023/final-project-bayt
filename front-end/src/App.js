import { BrowserRouter, Routes, Route } from "react-router-dom";
// import css
import "./App.css";
import "./index.css";
// link other pages
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Finances from "./pages/finances";
import Alerts from "./pages/alerts";

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/finances" element={<Finances />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
