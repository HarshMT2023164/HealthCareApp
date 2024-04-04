import { Search } from "@mui/icons-material";
import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../utils/Context/SearchContext";
import { ROLES } from "../../utils/constants/Roles";
import UserDetailsContext from "../../utils/Context/UserContext";

export default function ListAppBar(props) {
  const { role } = props;
  const navigate = useNavigate();
  const { setSearchText } = useContext(SearchContext);
  const { userDetails,setUserDetails } = useContext(UserDetailsContext);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <AppBar position="static" className="list-app-bar-cont">
      <Toolbar className="list-toolbar">
        <div className="list-toolbar-item">
          <Typography variant="h4" className="list-toolbar-item">
            {role}
          </Typography>
        </div>
        <div className="list-toolbar-item list-toolbar-item-middle">
          <div>
            <Search />
          </div>
          <TextField
            variant="standard"
            placeholder="Search here"
            onChange={handleSearch}
            className="admin-search-text-field"
          />
        </div>
        <div className="list-toolbar-item">
        {role != ROLES.CITIZEN && (
          
            <Button
              variant="contained"
              className="list-toolbar-button"
              onClick={() => {
                setUserDetails(null);
                navigate("/register/" + role);
              }}
            >
              Add {role}
            </Button>
          
        )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
