import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Logoimage from "../../utils/images/logo_bg-removebg-preview.png";
import { ROLES } from "../../utils/constants/Roles";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Medication } from '@mui/icons-material';
import { Person } from '@mui/icons-material';
import { AssignmentInd } from '@mui/icons-material';
import { PersonSearch } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import DrawerContext from '../../utils/Context/DrawerContext';
import { useContext } from 'react';

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: 1,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  width:70,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: 1,
  }),
  overflowX: 'hidden',
  // width: `calc(${theme.spacing(7)} + 1px)`,
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(8)} + 1px)`,
  // },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', // Add space-between to push the icons to opposite ends
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: open ? drawerWidth : 60, // Adjust this value for the closed width
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Navbar = () => {
  const theme = useTheme();
  const {open, setOpen} = useContext(DrawerContext);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const onClickLogout = () => {
    // Implement logout functionality here
    localStorage.clear();
  };

  return (
    // <div style={{ position: 'relative' }}>
      /* <IconButton onClick={handleDrawerOpen} sx={{ marginLeft:open?20:7, marginTop: 6, zIndex: 10 }}>
        <ChevronRightRounded sx={{ width: 25, height: 25 ,border:1,borderRadius:10}} />
      </IconButton> */
    <Box sx={{ display: 'flex'}}>
      <Drawer variant="permanent" open={open} 
      sx={{
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        '& .MuiDrawer-paper': {
          backgroundColor: 'white',
          borderTopRightRadius:5,
          borderBottomRightRadius:5,
          border: '1px solid lightgray',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
          paddingLeft:1,
        },
      }}
      >
        <DrawerHeader>
        <IconButton onClick={handleDrawerOpen}>
            <Menu/>
          </IconButton>
          {/* <IconButton onClick={handleDrawerOpen}>
            { <img src={Logoimage} alt="logo" className="sidebar-img" height={50} width={50}/>}
          </IconButton> */}
        </DrawerHeader>
        {/* <Divider /> */}
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <img src={Logoimage} alt="logo" className="sidebar-img" />
            </ListItemButton>
          </ListItem>
          {/* <Divider/> */}
          <NavLink
            to={"/admin/roles"}
            className="link-tag"
            activeClassName="active-link"
          >
            
            <ListItem disablePadding>

              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          {/* <Divider/> */}
          {/* Add more NavLink components for other links */}
          <NavLink
            to={"/admin/viewList/" + ROLES.SUPERVISOR}
            className="link-tag"
            activeClassName="active-link"
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Supervisors" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink
            to={"/admin/viewList/" + ROLES.FHW}
            className="link-tag"
            activeClassName="active-link"
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonSearch/>
                </ListItemIcon>
                <ListItemText primary="FHW" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink
            to={"/admin/viewList/" + ROLES.DOCTOR}
            className="link-tag"
            activeClassName="active-link"
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Medication/>
                </ListItemIcon>
                <ListItemText primary="Doctors" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink
            to={"/admin/viewList/" + ROLES.RECEPTIONIST}
            className="link-tag"
            activeClassName="active-link"
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentInd />
                </ListItemIcon>
                <ListItemText primary="Receptionists" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink
            to={"/admin/viewList/" + ROLES.CITIZEN}
            className="link-tag"
            activeClassName="active-link"
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Citizens" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink
            to={"/"}
            className="link-tag"
            activeClassName="active-link"
          >
            <ListItem disablePadding onClick={onClickLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          {/* Repeat the pattern for other links */}
        </List>
        {/* <Divider /> */}
        
        {/* <List>
          <NavLink
            to={"/"}
            className="link-tag"
            activeClassName="active-link"
          >
            <ListItem disablePadding onClick={onClickLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List> 
        */}
      </Drawer>
    </Box>
    // </div>
  );
};

export default Navbar;
