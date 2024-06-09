import "../css/AddMemberPic.css";
import React, { useRef, useState} from 'react';
import prof from "./../Default.svg";


const AddMembersPic = (props) => {
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
                const base64Image = reader.result.split(',')[1];
                setImage(e.target.result);
                //append to parent formData
                const imageData = {'base64': base64Image, 'filename': selectedFile.name}
                props.onImageClick('file', imageData);
            }
        } 
        fileInputRef.current.value = '';
    }


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

export default AddMembersPic;