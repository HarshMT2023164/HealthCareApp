import { List, ListItemButton, Paper } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import Logoimage from "../../utils/images/logo_bg-removebg-preview.png";

const ReceptionistNavBar = () => {
  return (
    <Paper component={"nav"} elevation={3} className="sidebar">
      <List className="sidebar-list">
        <ListItemButton>
          <img src={Logoimage} alt="logo" className="sidebar-img" />
        </ListItemButton>
        <NavLink
          to={"/receptionist/home"}
          className="link-tag"
          activeClassName="active-link"
        >
          <ListItemButton>
            <h4 className="nav-bar-items-text">Home</h4>
          </ListItemButton>
        </NavLink>
        <NavLink
          to={"/receptionist/Profile"}
          className="link-tag"
          activeClassName="active-link"
        >
          <ListItemButton>
            <h4 className="nav-bar-items-text">Profile</h4>
          </ListItemButton>
        </NavLink>
        {/* <NavLink
          to={"/viewList/Supervisor"}
          className="link-tag"
          activeClassName="active-link"
        >
          <ListItemButton>
            <h4 className="nav-bar-items-text"> Supervisors</h4>
          </ListItemButton>
        </NavLink>

        <NavLink
          to={"/viewList/FieldHealthWorker"}
          className="link-tag"
          activeClassName="active-link"
        >
          <ListItemButton>
            <h4 className="nav-bar-items-text">Field Health Workers</h4>
          </ListItemButton>
        </NavLink>

        <NavLink
          to={"/viewList/Doctor"}
          className="link-tag"
          activeClassName="active-link"
        >
          <ListItemButton>
            <h4 className="nav-bar-items-text">Doctors</h4>
          </ListItemButton>
        </NavLink>

        <NavLink
          to={"/viewList/Patient"}
          className="link-tag"
          activeClassName="active-link"
        >
          <ListItemButton>
            <h4 className="nav-bar-items-text">Patients</h4>
          </ListItemButton>
        </NavLink> */}
        
        <NavLink to={"/"} className="link-tag" activeClassName="active-link">
          <ListItemButton>
            <h4 className="nav-bar-items-text">Logout</h4>
          </ListItemButton>
        </NavLink>
      </List>
    </Paper>
  );
};

export default ReceptionistNavBar;
