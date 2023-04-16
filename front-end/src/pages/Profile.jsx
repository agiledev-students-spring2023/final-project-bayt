import { useState} from "react";
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

  //This will be changed the moment we set authentication and database up
  //But since we do not yet, we must rely on hardcoded username in front-end to retreive this persons profile nformation
  //ideally we would retrieve the user's username once they start a database session and store it safely
  const username = "badbunny";

  React.useEffect(() => {
    axios
        .get(`/api/Profile/${username}`)
        .then(response => {
         setName(response.data.username);   
        })
    .catch (err => {
    console.log(err);
    })
}, [])

  
  return (
    <div className="profile-container">
        <h2 className="name-display">
          {name}
        </h2>
    </div>
  );
    
}

//replace h1 with header and delete from css
const Profile = () => {
    return (
    <>
      <Header title="Profile"/>
      <div>
        <div className="outer">
            <ProfilePic/>
            <NameInfo/>
            <ProfInfo/>
        </div>
      </div>
      <Footer/>
    </>  
    );
};

export default Profile