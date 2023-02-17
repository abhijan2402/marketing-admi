import React from 'react'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import './Admin.css';

const AdminAccess = () => {
  return (
    <>
        <div className="main_container">
            <div className="admin_access">
                <h1>Welcome to Marketing Admin Page</h1>
                <Link to='/AdminAccess' style={{textDecoration:"none"}}><Button variant="contained">Get Started</Button></Link>                
            </div>
        </div>
    </>
  )
}

export default AdminAccess;