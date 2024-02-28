

import React from 'react';
import { List,ListItemButton, ListItemIcon, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import Logoimage from '../utils/images/logo_bg-removebg-preview.png'

const NavBar = () => {
  return (
    <Paper component={"nav"} elevation={3} className="sidebar">
        <List className='sidebar-list'>
          <ListItemButton>
            <img src={Logoimage} alt='logo' className='sidebar-img'/>
          </ListItemButton>
          <ListItemButton>
              <h4 className="nav-bar-items-text">Home</h4>
          </ListItemButton> 
          <ListItemButton>
              <h4 className="nav-bar-items-text"> Supervisors</h4>
          </ListItemButton> 
          <ListItemButton>
            <h4 className="nav-bar-items-text">Field Health Workers</h4>
          </ListItemButton>
          <ListItemButton>
            <h4 className="nav-bar-items-text">Doctors</h4>
          </ListItemButton>
          <ListItemButton>
            <h4 className="nav-bar-items-text">Patients</h4>
          </ListItemButton>

          <ListItemButton>
            <h4 className="nav-bar-items-text">Logout</h4>
          </ListItemButton>
        </List>
    </Paper>
  );
}



export default NavBar;