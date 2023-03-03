import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPlayer from "react-player";
import Pic2 from "../../assest/download.jfif";
import video from "../../assest/video1.mp4";
import "./project.css";
import { collection, query, getDocs } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
const Project = () => {
  useEffect(() => {
    getData();
  }, []);
  const [data, setdata] = useState([]);
  const getData = async () => {
    let resultArray = [];
    const q = query(collection(db, "orderItems"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArray.push({ id: doc.id, ...doc.data() });
    });
    setdata(resultArray);
    console.log(data)
  };
  const delData = async (item) => {
    console.log(item);
    try {
      await StorageDeletion(item);
      await deleteDoc(doc(db, "orderItems", item.id));
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const StorageDeletion = async (item) => {
    try {
      const ImageData = item.titleMainImage;
      const ID = JSON.stringify(ImageData);
      const myArray = ID.split("file%2F", 2);
      let word = myArray[1];
      const check = word.split("?");
      // console.log(check[0]);
      const desertRef = ref(storage, `file/${check[0]}`);
      await deleteObject(desertRef)
        .then(() => {
          console.log("deleted Title Images");
        })
        .catch((error) => {
          console.log(error);
        });
      const arrayImage = item.images
      console.log(arrayImage, "i am arry image");
      let k = 0;
      for (k = 0; k < arrayImage.length; k++) {
        const ImageDataArr = arrayImage[k];
        const IDArr = JSON.stringify(ImageDataArr);
        const myArrayArr = IDArr.split("file%2F", 2);
        let wordArr = myArrayArr[1];
        const checkArr = wordArr.split("?");
        // console.log(checkArr[0], 'I am in gthe array');
        const desertRef = ref(storage, `file/${checkArr[0]}`);
        await deleteObject(desertRef)
          .then(() => {
            console.log("deleted Array Images");
          })
          .catch((error) => {
            console.log(error);
          });

      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="main_project_container2">
        {data.length == null ? (
          <p>No Posts Yet</p>
        ) : (
          data.map((item, key) => (
            <>
              <div key={item.id} className="project_list">
                <div className="project_name">
                  <label htmlFor="text">{item.projectName}</label>
                  <DeleteIcon style={{ color: "red" }} onClick={() => {
                    delData(item);
                  }} />
                </div>
                <div className="heading">
                  <p style={{ fontWeight: "700", width: "100px" }}>Heading:</p>
                  <p>{item.heading}</p>
                </div>
                <div className="sub_heading">
                  <p style={{ fontWeight: "700", width: "150px" }}>
                    Sub Heading:
                  </p>
                  <p>{item.subHeading}</p>
                </div>
                <div className="images">
                  {item.images.map((data) => (
                    <img
                      style={{
                        boxShadow:
                          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                        width: "30%",
                        height: "30%",
                      }}
                      src={data}
                      alt="Pic 1"
                    />
                  ))}
                </div>
              </div>
              <div className="vid_player">
                {
                  item.videos.length &&
                  item.videos.map((vid) => (
                    <div style={{ width: "90%", height: '70vh', resize: 'both', display: "flex", alignItems: "center", justifyContent: "center", display: "column" }}>
                      <video controls autoPlay={true} >
                        <source src={vid} />
                      </video>
                    </div>
                  ))
                }
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default Project;
