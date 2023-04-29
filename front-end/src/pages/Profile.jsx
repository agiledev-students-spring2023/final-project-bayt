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

//editable Name part of profile.  It renders and updates each time user changes it. 
const NameInfo = () => {

  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  React.useEffect(() => {
    axios
      .get(`/api/Profile`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then(response => {
        setName(response.data.username);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])


  const handleNameClick = () => {
    setIsEditing(true);
    setTempName(name);
  };


  const handleNameChange = (event) => {
    setTempName(event.target.value);
  };


  const handleNameKeyPress = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false);

      if (tempName.trim() !== '') {
        setName(tempName.trim());
        axios
          .put(`/api/Profile`, { username: tempName.trim() }, {
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      }

      else {
        setTempName(name);
      }
    }
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (tempName.trim() !== '') {
      setName(tempName.trim());
      axios
        .put(`/api/Profile`, { username: tempName.trim() }, {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    }

    else {
      setTempName(name);
    }

  };


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
      });
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header title="Profile" />
          <Header title="Profile" />
          <div>
            <div className="outer">
              <ProfilePic />
              <NameInfo />
              <ProfInfo />
              <ProfilePic />
              <NameInfo />
              <ProfInfo />
            </div>
          </div>
          <Footer />
          <Footer />
        </>
      ) : (
        <Navigate to='/login?error=protected' />
      )}
    </>
  );
};

export default Profile