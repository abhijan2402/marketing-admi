import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPlayer from "react-player";
import Pic2 from "../../assest/download.jfif";
import video from "../../assest/video1.mp4";
import { db, storage } from "../../firebase";
import "./project.css";
import { collection, query, getDocs } from "firebase/firestore";
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
    console.log(data);
  };
  return (
    <>
      <div className="main_project_container2">
        {data.length == null ? (
          <p>hi</p>
        ) : (
          data.map((item, key) => (
            <>
              <div key={item.id} className="project_list">
                <div className="project_name">
                  <label htmlFor="text">Project No. 1 </label>
                  <DeleteIcon style={{ color: "red" }} />
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
                <ReactPlayer
                  url="https://youtu.be/_TBwL9GgoZE"
                  controls={true}
                  width="1040px"
                  height="360px"
                  loop="true"
                  style={{ coursor: "pointer" }}
                ></ReactPlayer>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default Project;
