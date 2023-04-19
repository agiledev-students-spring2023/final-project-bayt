//Profile_pic component
import "../css/Profile_pic_component.css";
import React, { useRef, useState } from 'react';
import prof from "./../img.svg";
import axios from "axios";


const ProfilePic = () => {
  //get image  otherwise default profile svg)
  const [image, setImage] = useState(prof); 
  const fileInputRef = useRef(null);

  const handleChange = async (event) => {
    const selectedFile = event.target.files[0];
    
    
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      //render image
      reader.onload =async (e) => {
        setImage(e.target.result);

        // Create a FormData object and append the file to it
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Send a POST request to the /profile endpoint with the FormData object
        try {
          const response = await axios.post(`/api/Profile`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response.data);
        }
        catch (error) {
          console.error(error);
        }
      };
    }

    else {
      setImage(prof);
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
