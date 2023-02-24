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


const Admin = () => {
    const [images,setImages]=useState([]);
    const [videos,setVideos]=useState([]);
    const [heading,setHeading]=useState('');
    const [subHeading,setSubHeading]=useState('');
    const [titleImage,setTitleImage]=useState('');

    const [imaegsDownLoadUrls,setImaegsDownLoadUrls]=useState([]);
    const [videoDownLoadUrls,setVidoeDownLoadUrls]=useState([]);

    const [loading,setLoading]=useState(false)
    async function createOrderItems(images,videos,titleImageUrl) {
        try {
            await addDoc(collection(db, "orderItems"), {
                heading:heading,
                subHeading:subHeading,
                images:images,
                videos:videos,
                titleMainImage:titleImageUrl
              })
              .then((docRef) => {
                setLoading(false)
                alert("Post Added")
            })
              
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
    const setCompleteData=async(images,videos)=>{
        try {
            const storageRef = ref(storage, `/file/${titleImage.name}`);
            const uploadTask = uploadBytesResumable(storageRef, titleImage);
            return uploadTask.on('state_changed', 
                (snapshot)=>{},
                (error) => {
                    console.log(error)
                }, 
                () => {
                    return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        createOrderItems(images,videos,downloadURL)
                    })
                }
            );
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
    const getDownloadUrlOfImage=async()=>{
        setLoading(true)
        try {
            if(heading==='' || subHeading === '' || titleImage==="")
                throw "Heading , SubHeading and title image is mandaory"
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
                                    setCompleteData(imagesLink,[])
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
                    setCompleteData([],[])
                }
            }
        } catch (error) {
            setLoading(false)
            alert(error)
        }
    }
    const getDownloadUrlOfVideo=(images)=>{
        try {
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
                                setCompleteData(images,videoLink)
                            })
                        }
                    );
                })
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
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
                            <SingleImageSelector
                                getImage={(singleImage)=>{
                                    setTitleImage(singleImage)
                                }}
                            />
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
                            disabled={loading}
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