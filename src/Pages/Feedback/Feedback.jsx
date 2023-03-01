import React, { useEffect, useState } from "react";
import Card from '../../Components/Card/Card'
import './Feedback.css'
import { db, storage } from "../../firebase";
import { collection, query, getDocs } from "firebase/firestore";
const Feedback = () => {
  useEffect(() => {
    getData();
  }, []);
  const [data, setdata] = useState([]);
  const getData = async () => {
    let resultArray = [];
    const q = query(collection(db, "Feedback"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArray.push({ id: doc.id, ...doc.data() });
    });
    console.log(resultArray)
    setdata(resultArray);
    console.log(data)
  };
  return (
    <>
      <div className="container_feedback">
        <div className="heading">
          <h1>Feedback</h1>
        </div>
        <div className="fedback_card">
          {
            data.length == null ? <h1>No feedback to show</h1> :
              data.map((item) => (
                <Card Message={item.Message} Name={item.Name} Email={item.Email} />

              ))
          }

        </div>
      </div>
    </>
  )
}

export default Feedback