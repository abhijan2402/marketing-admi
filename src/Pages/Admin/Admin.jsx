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
import { async } from '@firebase/util';


const Admin = () => {
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
            titleMainImage:titleImg
        })
        .then((docRef) => {
            return docRef.id
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    const getDownloadUrl=async(file)=>{
        const storageRef = ref(storage, `/file/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return new Promise((resolve,reject)=>{uploadTask.on('state_changed', 
                (snapshot)=>{},
                (error) => {
                    reject(error)
                }, 
                () => {
                    return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                    .catch((e)=>{
                        reject(e)
                    })
                }
            );
        })
    }

    async function processFiles(filesArray){
        console.log("Star")
        let fileUrlArray=[];
        for(let i = 0; i < filesArray.length; i++){
            let result = await getDownloadUrl(filesArray[i]);
            fileUrlArray.push(result);
        }
        return fileUrlArray
    }
    
    async function uploadData(){
        setLoading(true)
       try{
        if(heading=='' || subHeading==='' ){
            alert("Please give title , subTitle and project Image");
            return;
        }
        const videosUrlArray=await processFiles(videos);
        const imagesUrlArray=await processFiles(images);
        const titleImageUrl=await getDownloadUrl(titleImage);
        let res=await createData(imagesUrlArray,videosUrlArray,titleImageUrl);
        if(res)
            setLoading(false);
       }catch(e){
        setLoading(false)
        alert("Something gonna wrong")
        console.log(e)
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
                            <input type="text" placeholder='Project Name' onChange={(projectName)=>setProjectName(projectName.target.value)} /> <br />
                            <input type="text" placeholder='Heading' onChange={(heading)=>setHeading(heading.target.value)} /> <br />
                            <input type="text" placeholder='Sub Heading' onChange={(subheading)=>setSubHeading(subheading.target.value)}/>
                            <SingleImageSelector
                                getImage={(singleImage)=>{
                                    console.log(singleImage)
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
                            onClick={uploadData}
                        >
                            {
                                loading?"Uploading Files do not refresh":"Add Project"
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;