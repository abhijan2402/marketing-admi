import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import Image from '../../Components/UploadImage/Image';
import Video from '../../Components/UploadVideo/Video';

const Admin = () => {
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
                        <Image/>
                        <Video/>
                    </form>
                    <Button variant="contained">Add Project</Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Admin;