//Profile_pic component
import "../css/Profile_pic_component.css";
import React, { useRef, useState,useEffect } from 'react';
import prof from "./../Default.svg";
import axios from "axios";


const ProfilePic = (props) => {
  //get image  otherwise default profile svg)
  const [image, setImage] = useState(null); 
  const fileInputRef = useRef(null);
  const username = props.username;

  useEffect(() => {
      if (username){
      // Make a GET request to the /api/Profile endpoint with the username as a parameter
      axios.get(`/api/Profile/${username}`, { responseType: 'json' })
        .then((response) => {
          if (response.data.data.profile_pic ==='Default.svg'){
            setImage(prof);
          }
          else
          {
            // Decode the Base64 image data to a binary format
            const binaryData = atob(response.data.image);
            const arrayBuffer = new ArrayBuffer(binaryData.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < binaryData.length; i++) {
              uint8Array[i] = binaryData.charCodeAt(i);
            }
  
            // Create an object URL for the binary data
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            setImage(url);
          }
      })
        .catch((error) => {
          console.error(error);
        })
    };
  }, [username]);




  const handleChange = async (event) => {
    const selectedFile = event.target.files[0];


    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      //render image and we want it to persist so set to local storage (will change this when working with mockaroo)
      reader.onload = async (e) => {
        setImage(e.target.result);

        // Create a FormData object and append the file to it
        const formData = new FormData();
        formData.append('file', selectedFile);


        
        // Send a POST request to the /profile endpoint with the FormData object
        try {
          const response = await axios.post(`/api/Profile`, formData);
          console.log(response.data);
        }
        catch (error) {
          console.error(error);
        }
      };
    }

   fileInputRef.current.value = '';
  };



  return (
    <><div>
      <div className="profileImg">
        <img src={image} className="img" alt="" />
      </div>
      <input type='file' id="uploadPic" ref={fileInputRef} onChange={handleChange} />
      <label htmlFor="uploadPic" className="custom-file-upload">Upload file</label>
    </div><div>
        <div className="profileImg">
          <img src={image} className="img" alt="" />
        </div>
        <input type='file' id="uploadPic" ref={fileInputRef} onChange={handleChange} />
        <label htmlFor="uploadPic" className="custom-file-upload">Upload file</label>
      </div></>
  );
};

export default ProfilePic;
