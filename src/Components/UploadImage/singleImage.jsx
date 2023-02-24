import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Image.css'
import { NameSeperator } from '../../helpers/filesNameSeperator';

const SingleImageSelector = ({setImageVlaue}) => {
    const [name,setName]=useState('')
    const handleImageValue = (e) => {
        const namesArray=NameSeperator(e.target.files[0].type);
        if(namesArray[0] === "image"){
            setImageVlaue(e.target.files[0]);
            setName(e.target.files[0].name)
        }
        else{
            alert("Please Select Image");
        }
    }

  return (
   <>
    <div className="image_upload">
        <div className="image">
            <input  type="file" id='file' onChange={handleImageValue}/>
            <label htmlFor="file">{name?name:"Select Single Image"} <AddCircleIcon style={{color:"blue", fontSize:"35px", cursor:"pointer"}}/></label>
        </div> 
    </div>
   </>
  )
}

export default SingleImageSelector