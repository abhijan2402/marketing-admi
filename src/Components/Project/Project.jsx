import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ReactPlayer from 'react-player';


import Pic2 from '../../assest/download.jfif';
import video from '../../assest/video1.mp4';
import './project.css'

const Project = () => {
  return (
    <>
    <div className="main_project_container2">
                    <div className="project_list">
                        <div className="project_name">
                            <label htmlFor="text">Project No. 1 </label>
                            <DeleteIcon style={{color:"red"}}/>
                        </div>
                        <div className="heading">
                                <p style={{fontWeight:"700",width:"100px"}}>Heading : </p>
                                <p> This is Heading</p>
                        </div>
                        <div className="sub_heading">
                                <p style={{fontWeight:"700",width:"150px"}}>Sub Heading: </p>
                                <p> This is my Sub-Heading. It consist of  255 letters having 34 characters.</p>
                        </div>
                        <div className="images">
                                <img style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}} src={Pic2} alt="Pic 1" />
                                <img style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}} src={Pic2} alt="Pic 2" />
                                <img style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}} src={Pic2} alt="Pic 3" />
                        </div>
                    </div>

                    <div className="vid_player">
                        <ReactPlayer  url="https://youtu.be/_TBwL9GgoZE" controls={true} width="1040px" height="360px" loop="true" style={{coursor:"pointer"}}></ReactPlayer>
                    </div>
    </div>       

    </>
  )
}

export default Project