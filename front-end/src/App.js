import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import "./index.css";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";
import IndividualTask from "./pages/IndividualTask";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import RoomTemplate from "./pages/RoomTemplate";
import Finances from "./pages/finances";
import Alerts from "./pages/alerts";
import Settings from "./pages/Settings";
import AddMembers from "./pages/AddMember";
import React from "react";
import { Helmet } from "react-helmet";
// import axios from 'axios';

// axios.interceptors.request.use(function (config) {
//   // Check if the request is not login or signup routes
//   if (!config.url.startsWith('/api/login') && !config.url.startsWith('/api/signup')) {
//     console.log('intercepted request');
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `JWT ${token}`;
//     }
//   }
//   return config;
// });

function App() {
  return (
    <div className="App">
      <Helmet>
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Welcome />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/tasks" element={<Tasks />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/tasks/add" element={<IndividualTask />}></Route>
          <Route path="/tasks/:id" element={<IndividualTask />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route
            index
            path="/room/:roomName"
            element={<RoomTemplate />}></Route>
          <Route index path="/finances" element={<Finances />}></Route>
          <Route index path="/alerts" element={<Alerts />}></Route>
          <Route index path="/Settings" element={<Settings />}></Route>
          <Route index path="/AddMembers" element={<AddMembers />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
