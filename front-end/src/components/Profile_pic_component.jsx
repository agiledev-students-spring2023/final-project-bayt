//Profile_pic component
import "../css/Profile_pic_component.css";
import React, { useRef, useState } from 'react';
import prof from "./../img.svg";


const ProfilePic = () => {
  //get image in local storage if already uploaded, otherwise undefined (maybe change to default profile svg)
  const [image, setImage] = useState(localStorage.getItem('img') || prof);
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    
    
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      //render image and we want it to persist so set to local storage (will change this when working with mockaroo)
      reader.onload = (e) => {
        setImage(e.target.result);
        localStorage.setItem('img', e.target.result);
      };
    }

    else {
      setImage(prof);
      localStorage.removeItem('img');
    }

    fileInputRef.current.value = '';

  };

  return (
      <div>
        <div className="profileImg">
        <img src={image} className="img" alt="" />   
        </div>
        <input type='file' id="uploadPic" ref={fileInputRef} onChange={handleChange} />
        <label htmlFor="uploadPic" className="custom-file-upload">Upload file</label>
      </div>
  );
};

export default ProfilePic;





//will delete this later but playing with it for now
/* cleaner code but keeps the ugly "no file chosen text" with input type file

const Profile_pic = () => {
  //
  const [image, setImage] = useState(localStorage.getItem("img") || undefined)
  
  const handleChange = (event) => {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (e) => {
      setImage(e.target.result);
      localStorage.setItem("img", e.target.result );
    };
  };

  return (
          <div>
          <div>
              <img src={image} className="img" alt="" />
          </div>
           <input type='file' id="uploadPic"  onChange={handleChange} value="" />
          </div>
    );
}
*/