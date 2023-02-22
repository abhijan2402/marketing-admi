import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import Image from '../../Components/UploadImage/Image';
import Video from '../../Components/UploadVideo/Video';
import FilesNameContainer from '../../Components/Project/FilesNamesContainer';

const Admin = () => {
    const [images,setImages]=useState([]);
    const [videos,setVideos]=useState([]);
    const showImges=()=>{
        console.log(videos);
    }
    return (
        <>
            <div className="main_container">
            
                <div className="admin_page">
                    <h5>Admin page</h5>
                    <div className="admin_access_button">
                    <p>Add Your Projects</p>
                        <div className="access_buttons">
                            <Button variant="contained">Add More</Button>
                            <Link to='/ProjectList' style={{textDecoration:"none"}}><Button variant="contained">See List</Button></Link>
                        </div>

                    </div>
                    <div className="admin_details">
                        <form>
                            <input type="text" placeholder='Heading'/> <br />
                            <input type="text" placeholder='Sub Heading'/>
                           
                            <Image
                                setImageArray={(image)=>{
                                    setImages([...images,image])
                                }}
                            />
                             <FilesNameContainer
                                fileNameArray={images}
                            />
                            <Video
                                setVideosArray={(video)=>{
                                    setVideos([...videos,video])
                                }}
                            />
                            <FilesNameContainer
                                fileNameArray={videos}
                            />
                        </form>
                        <Button variant="contained"
                            onClick={showImges}
                        >
                            Add Project
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;