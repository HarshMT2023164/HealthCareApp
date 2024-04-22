import { List, ListItemButton, Paper } from "@mui/material";
import React from "react";
import Logoimage from "../../utils/images/logo_bg-removebg-preview.png";
import { NavLink } from "react-router-dom";
const DoctorNavBar = () => {
  return (
    <div>
      <Paper component={"nav"} elevation={3} className="sidebar">
        <List className="sidebar-list">
          <ListItemButton>
            <img src={Logoimage} alt="logo" className="sidebar-img" />
          </ListItemButton>
          <NavLink
            to={"/doctor/landingScreen"}
            className="link-tag"
            activeClassName="active-link"
          >
            <ListItemButton>
              <h4 className="nav-bar-items-text">Home</h4>
            </ListItemButton>
          </NavLink>
          <NavLink to={"/doctor/dashboard"} className="link-tag" activeClassName="active-link">
            <ListItemButton>
              <h4 className="nav-bar-items-text">Dashboard</h4>
            </ListItemButton>
          </NavLink>

          <NavLink to={"/doctor/profile"} className="link-tag" activeClassName="active-link">
            <ListItemButton>
              <h4 className="nav-bar-items-text">Profile</h4>
            </ListItemButton>
          </NavLink>

          <NavLink to={"/"} className="link-tag" activeClassName="active-link">
            <ListItemButton>
              <h4 className="nav-bar-items-text">Logout</h4>
            </ListItemButton>
          </NavLink>
        </List>
      </Paper>
    </div>
  );
};

export default DoctorNavBar;
