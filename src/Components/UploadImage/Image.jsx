import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Image.css'
import { NameSeperator } from '../../helpers/filesNameSeperator';

const Image = ({setImageArray}) => {

    const handleImage = (e) => {
        const namesArray=NameSeperator(e.target.files[0].type);
        if(namesArray[0] === "image"){
            setImageArray(e.target.files[0]);
        }
        else{
            alert("Please Select Image");
        }
    }

  return (
   <>
    <div className="image_upload">
        <div className="image">
            <input  type="file" id='file' onChange={handleImage}/>
            <label htmlFor="file">Add Image <AddCircleIcon style={{color:"blue", fontSize:"35px", cursor:"pointer"}}/></label>
        </div> 
    </div>
   </>
  )
}

export default Image