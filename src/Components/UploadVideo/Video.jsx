import React, {useState} from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Video.css'
const Video = () => {
    const [Video, setVideo] = useState("");

    const handleVideo = (e) => {
        setVideo(e.target.files[0]);
    }

  return (
   <>
    <div className="Video_upload">
        <div className="Video">
            <input  type="file" id='video' onChange={handleVideo}/>
            <label htmlFor="video">Add Video <AddCircleIcon style={{color:"blue", fontSize:"35px",cursor:"pointer"}}/></label>
        </div>
        <p  style={{fontSize:"12px", marginLeft:"10px"}}>{Video.name}</p>       
    </div>
   </>
  )
}

export default Video