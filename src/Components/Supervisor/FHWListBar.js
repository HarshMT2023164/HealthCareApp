import { Search } from "@mui/icons-material";
import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import SupervisorContext from "../../utils/Context/SupervisorContext";
// import SupervisorContext from "../../utils/Context/SupervisorContext";

export default function FHWListBar(props)
{
    const {role} = props;
    const navigate = useNavigate();
    const {searchFHW,setSearchFHW} = useContext(SupervisorContext);

    const handleSearch = (e) => {
        setSearchFHW(e.target.value);
    };
    return(
        <AppBar position="static">
            <Toolbar className="list-toolbar">
                <div className="list-toolbar-item">
                <Typography variant="h5" className="list-toolbar-item">
                    {"Available Health Workers:"}
                </Typography>
                </div>
                <div className="list-toolbar-item list-toolbar-item-middle">
                    <div><Search/></div>
                    <TextField variant="standard" placeholder="Search here" onChange={handleSearch}/>
                </div>
                {/* <div className="list-toolbar-item">
                <Button variant='contained' className="list-toolbar-button" onClick={() => {navigate("/register/" + role)}}>Add {role}</Button>
                </div> */}
            </Toolbar>
        </AppBar>
    );
}