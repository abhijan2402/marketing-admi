import React, {useState} from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Image.css'
const Image = () => {
    const [image, setImage] = useState("");

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

  return (
   <>
    <div className="image_upload">
        <div className="image">
            <input  type="file" id='file' onChange={handleImage}/>
            <label htmlFor="file">Add Image <AddCircleIcon style={{color:"blue", fontSize:"35px", cursor:"pointer"}}/></label>
        </div>
        <p style={{fontSize:"12px", marginLeft:"10px"}}>{image.name}</p>       
    </div>
   </>
  )
}

export default Image