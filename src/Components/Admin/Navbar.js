import { List, ListItemButton, Paper } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import Logoimage from "../../utils/images/logo_bg-removebg-preview.png";
import { ROLES } from "../../utils/constants/Roles";

const NavBar = () => {
  const onClickLogout = () => {
    localStorage.clear();
  } 
  return (
    <Paper component={"nav"} elevation={3} className="sidebar">
      <List className="sidebar-list">
        <ListItemButton>
          <img src={Logoimage} alt="logo" className="sidebar-img" />
        </ListItemButton>
        <NavLink
          to={"/admin/roles"}
          className="link-tag"
          activeClassName="active-link"
        >
          <ListItemButton>
            <h4 className="nav-bar-items-text">Home</h4>
          </ListItemButton>
        </NavLink>

        <NavLink
          to={"/admin/viewList/" + ROLES.SUPERVISOR}
          className="link-tag"
          activeClassName="active-link"
        >
          <ListItemButton>
            <h4 className="nav-bar-items-text"> Supervisors</h4>
          </ListItemButton>
        </NavLink>

        <NavLink
          to={"/admin/viewList/" + ROLES.FHW}
          className="link-tag"
          activeClassName="active-link"
        >
          <ListItemButton>
            <h4 className="nav-bar-items-text">Field Health Workers</h4>
          </ListItemButton>
        </NavLink>

        <NavLink
          to={"/admin/viewList/" + ROLES.DOCTOR}
          className="link-tag"
          activeClassName="active-link"
        >
          <ListItemButton>
            <h4 className="nav-bar-items-text">Doctors</h4>
          </ListItemButton>
        </NavLink>

        <NavLink
          to={"/admin/viewList/" + ROLES.CITIZEN}
          className="link-tag"
          activeClassName="active-link"
        >
          <ListItemButton>
            <h4 className="nav-bar-items-text">Patients</h4>
          </ListItemButton>
        </NavLink>
        
        <NavLink to={"/"} className="link-tag" activeClassName="active-link">
          <ListItemButton onClick={() => onClickLogout()}>
            <h4 className="nav-bar-items-text">Logout</h4>
          </ListItemButton>
        </NavLink>
      </List>
    </Paper>
  );
};

export default NavBar;