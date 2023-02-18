import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Video.css'
import { NameSeperator } from '../../helpers/filesNameSeperator';

const Video = ({setVideosArray}) => {

    const handleVideo = (e) => {
        const namesArray=NameSeperator(e.target.files[0].type);
        if(namesArray[0] === "video"){
            setVideosArray(e.target.files[0]);
        }
        else{
            alert("Please Select Video");
        }
    }

  return (
   <>
    <div className="Video_upload">
        <div className="Video">
            <input  type="file" id='video' onChange={handleVideo}/>
            <label htmlFor="video">Add Video <AddCircleIcon style={{color:"blue", fontSize:"35px",cursor:"pointer"}}/></label>
        </div>   
    </div>
   </>
  )
}

export default Video