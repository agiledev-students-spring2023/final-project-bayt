import { useState} from "react";
import ProfilePic from "../components/Profile_pic_component";
import ProfInfo from "../components/Profile_info_component";
import "../css/Profile_pic_component.css";
import Header from './Header';
import Footer from './Footer';
import Popup from 'reactjs-popup';
import '../css/Profile.css';

//Delete account button and modal component
const DeleteAccountButton = () => {
    const handleDelete = () => {
      // Code to delete the account info from database goes here
      console.log('Account deleted');
    };
  
    return (
      <Popup
        trigger={<button className="delete-account-button">Delete Account</button>}
        modal
        overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
        nested
      >
        {(close) => (
          <div className="modal">
            <div className="header">Warning</div>
            <div className="content">
              <p>Are you sure you want to delete your account? This action is irreversible.  All account data will be lost.</p>
            </div>
            <div className="actions">
              <button className="button" onClick={close}>
                Cancel
              </button>
              <button className="button danger" onClick={handleDelete}>
                Delete Account
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  };
  

//editable Name part of profile.  It renders and updates each time user changes it. 
const Name_info = () => {

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
    <div className="outer">
        <Header title="Profile"/>
        <ProfilePic/>
        <Name_info/>
        <ProfInfo/>
        <div className="delete-Account">
            <DeleteAccountButton/>
        </div>
        <Footer/>
    </div>
    
    );
};

export default Profile

