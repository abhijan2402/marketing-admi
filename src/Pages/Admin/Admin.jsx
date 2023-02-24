import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import Image from '../../Components/UploadImage/Image';
import Video from '../../Components/UploadVideo/Video';
import FilesNameContainer from '../../Components/Project/FilesNamesContainer';
import { collection, addDoc } from "firebase/firestore"; 
import { db,storage } from '../../firebase';
import { ref,getDownloadURL,uploadBytesResumable } from "firebase/storage";
import SingleImageSelector from '../../Components/UploadImage/singleImage';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { NameSeperator } from '../../helpers/filesNameSeperator';

const Admin = () => {
    const [images,setImages]=useState([]);
    const [videos,setVideos]=useState([]);
    const [heading,setHeading]=useState('');
    const [subHeading,setSubHeading]=useState('');
    const [titleImage,setTitleImage]=useState('');

    const [imaegsDownLoadUrls,setImaegsDownLoadUrls]=useState([]);
    const [videoDownLoadUrls,setVidoeDownLoadUrls]=useState([]);

    async function createOrderItems(images,videos,titleImageUrl) {
        await addDoc(collection(db, "orderItems"), {
            heading:heading,
            subHeading:subHeading,
            images:images,
            videos:videos,
            // titleMainImage:titleImageUrl
          })
          .then((docRef) => {
            console.log(docRef.id)
        })
          
    }
    const setCompleteData=async(images,videos)=>{
        const storageRef = ref(storage, `/file/${titleImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, titleImage);
        return uploadTask.on('state_changed', 
            (snapshot)=>{},
            (error) => {
                console.log(error)
            }, 
            () => {
                return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // setCompleteData(images,videos,downloadURL)
                })
            }
        );
    }
    const getDownloadUrlOfImage=async()=>{
        if(images.length){
            console.log("image")
            let imagesLink=[];
            images.forEach((image)=>{
                const storageRef = ref(storage, `/file/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                return uploadTask.on('state_changed', 
                    (snapshot)=>{},
                    (error) => {
                        console.log(error)
                    }, 
                    () => {
                        return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            imagesLink.push(downloadURL)
                        }).then(()=>{
                            setImaegsDownLoadUrls(imagesLink)
                            if(videos.length){
                                getDownloadUrlOfVideo(imagesLink)
                            }
                            else{
                                createOrderItems(imagesLink,[])
                            }
                        })
                    }
                );
            })
        }
        else{
            if(videos.length){
                getDownloadUrlOfVideo([])
            }
            else{
                createOrderItems([],[])
            }
        }
    }
    const getDownloadUrlOfVideo=(images)=>{
        if(videos.length){
            videos.forEach((video)=>{
                let videoLink=[];
                const storageRef = ref(storage, `/file/${video.name}`);
                const uploadTask = uploadBytesResumable(storageRef, video);
                uploadTask.on('state_changed', 
                    (snapshot)=>{},
                    (error) => {
                        console.log(error)
                    }, 
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            videoLink.push(downloadURL)
                        }).then(()=>{
                            setVidoeDownLoadUrls(videoLink)
                            createOrderItems(images,videoLink)
                        })
                    }
                );
            })
        }
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
                            <input type="text" placeholder='Heading' onChange={(heading)=>setHeading(heading.target.value)} /> <br />
                            <input type="text" placeholder='Sub Heading' onChange={(subheading)=>setSubHeading(subheading.target.value)}/>
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
                            onClick={getDownloadUrlOfImage}
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