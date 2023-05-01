import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ProfilePic from "../components/Profile_pic_component";
import ProfInfo from "../components/Profile_info_component";
import "../css/Profile_pic_component.css";
import Header from './Header';
import Footer from './Footer';
import '../css/Profile.css';
import * as React from 'react';
import axios from 'axios';

//We do not want to change username mid session.
//May add code for this later but we don't want it to be editable on profile page
const NameInfo = (props) => {
  const name =props.username;

  return (
    <div className="profile-container">
        <h2 className="name-display">
          {name}
        </h2>
    </div>
  );  
}


const Profile = () => {
  const jwtToken = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get('/api/protected/profile/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then(res => {
        setUsername(res.data.user.username);
      })
      .catch(err => {
        setIsLoggedIn(false); // update this state variable, so the component re-renders
      });
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header title="Profile" />
          <div>
            <div className="outer">
                <ProfilePic />
                <NameInfo username={username}/>
                <ProfInfo/>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <Navigate to='/login?error=protected' />
      )}
    </>
  );
};

export default Profile