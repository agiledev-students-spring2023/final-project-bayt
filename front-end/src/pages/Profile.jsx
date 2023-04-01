import { useState} from "react";
import ProfilePic from "../components/Profile_pic_component";
import ProfInfo from "../components/Profile_info_component";
import "../css/Profile_pic_component.css";
import Header from './Header';
import Footer from './Footer';
import '../css/Profile.css';

//editable Name part of profile.  It renders and updates each time user changes it. 
const NameInfo = () => {

  const [name, setName] = useState('John Doe');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

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
      } else {
        setTempName(name);
      }
    }
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (tempName.trim() !== '') {
      setName(tempName.trim());
    } else {
      setTempName(name);
    }
  };
  
  return (
    <div className="profile-container">
      {isEditing ? (
        <input
          type="text"
          value={tempName}
          onChange={handleNameChange}
          onKeyDown={handleNameKeyPress}
          onBlur={handleNameBlur}
          autoFocus
          className="edit-input"
        />
      ) : (
        <h2 onClick={handleNameClick} className="name-display">
          {name}
        </h2>
      )}
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

