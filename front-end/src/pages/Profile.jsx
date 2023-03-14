import { useState, useEffect } from "react";
import axios from "axios";
import ProfilePic from "../components/Profile_pic_component";
import ProfInfo from "../components/profile_info_component";
import "../css/Profile_pic_component.css";
import Footer from './Footer';


const Profile = () => {
    return(
  
    <div className="outer">
        <h1>
           HEADER PLACEHOLDER 
        </h1>
        <ProfilePic/>
        <p>Name</p>
        <ProfInfo className="prof_info"/>
        <Footer/>
    </div>
    
    );
};

export default Profile
