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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const months=["January","February","March","April","May","June","July","August","September","October","November","Decemnber"]
const Admin = () => {
    const date=new Date();
    const [images,setImages]=useState([]);
    const [videos,setVideos]=useState([]);
    const [heading,setHeading]=useState('');
    const [projectName,setProjectName]=useState('');
    const [subHeading,setSubHeading]=useState('');
    const [titleImage,setTitleImage]=useState('');

    const [loading,setLoading]=useState(false)
    const createData=async(images,videos,titleImg)=>{
        return addDoc(collection(db, "orderItems"), {
            projectName:projectName,
            heading:heading,
            subHeading:subHeading,
            images:images,
            videos:videos,
            titleMainImage:titleImg,
            uploadedData:`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then((docRef) => {
            return docRef.id
        })
        .catch((e)=>{
            toast("Some thing gonna wrond Please try again")
        })
    }
    const getDownloadUrl=async(file)=>{
        const storageRef = ref(storage, `/file/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return new Promise((resolve,reject)=>{
            uploadTask.on('state_changed', 
                (snapshot)=>{},
                (error) => {
                    reject(error)
                }, 
                () => {
                    return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                    .catch((e)=>{
                        reject(false)
                    })
                }
            );
        })
    }

    async function processFiles(filesArray){
        try {
            let fileUrlArray=[];
            for(let i = 0; i < filesArray.length; i++){
                let result = await getDownloadUrl(filesArray[i]);
                if(result)
                    fileUrlArray.push(result);
                else
                    throw "Some thing gonna wrond Please try again"
            }
            return fileUrlArray   
        } catch (error) {
            toast(error)
        }
    }
    
    async function uploadData(){
        setLoading(true)
       try{
        if( projectName==='' ||heading=='' || subHeading==='' || titleImage===''){ 
            setLoading(false)
            toast("Please Give Project name , title , subtitle and One Heading Image");
            return;
        }
        toast("Uploading start")
        const videosUrlArray=await processFiles(videos);
        const imagesUrlArray=await processFiles(images);
        const titleImageUrl=await getDownloadUrl(titleImage);
        let res=await createData(imagesUrlArray,videosUrlArray,titleImageUrl);
        if(res){
            toast("Data Added")
            resetField()
            setLoading(false);
        }
        else{
            throw "Some thing gonna wrond Please try again"
        }
       }catch(e){
            setLoading(false)
            toast(e)
            console.log(e)
       }

    }
    
    const resetField=()=>{
        setProjectName('');
        setHeading('');
        setSubHeading('');
        setTitleImage('');
        setImages([])
        setVideos([]);
    }
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
            />
            <div className="main_container">
                <div className="admin_page">
                    <h5>Admin page</h5>
                    <div className="admin_access_button">
                    <p>Add Your Projects</p>
                        <div className="access_buttons">
                            <Link to='/Feedback' style={{textDecoration:"none"}}><Button variant="contained">Feedback</Button></Link>
                            <Link to='/ProjectList' style={{textDecoration:"none"}}><Button variant="contained">See List</Button></Link>
                        </div>

                    </div>
                    <div className="admin_details">
                        <form>
                            <input value={projectName} type="text" placeholder='Project Name' onChange={(projectName)=>setProjectName(projectName.target.value)} /> <br />
                            <input value={heading} type="text" placeholder='Heading' onChange={(heading)=>setHeading(heading.target.value)} /> <br />
                            <textarea style={{
                                width:"95%",
                                borderColor:"black",
                                fontWeight:"bold",
                                borderRadius:5,
                                marginTop:10,
                                padding:10
                            }} value={subHeading} type="text" placeholder='Sub Heading' onChange={(subheading)=>setSubHeading(subheading.target.value)} />
                            <SingleImageSelector
                                titleImage={titleImage}
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
                        {
                           loading?
                           <h1 style={{fontSize:15,textAlign:"center",cursor:"pointer"}}>Please wait you post is creating, Don't refresh the page</h1>:
                           <Button variant="contained" disabled={loading} onClick={uploadData} >  Add Project </Button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;