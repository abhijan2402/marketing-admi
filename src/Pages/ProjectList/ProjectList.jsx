import React from "react";
import Project from "../../Components/Project/Project";
import './ProjectList.css'
const ProjectList = () => {
  return (
    <>
      <div className="project_container">
        <div className="main_project_container1">
          <h4>Project List</h4>
          <Project />
        </div>
      </div>
    </>
  );
};

export default ProjectList;
