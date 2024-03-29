import { Search } from "@mui/icons-material";
import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import SupervisorContext from '../../utils/Context/SupervisorContext';

export default function SupervisorBar(props)
{
    const {role} = props;
    const navigate = useNavigate();
    const {searchArea,setSearchArea} = useContext(SupervisorContext);

    const handleSearch = (e) => {
        setSearchArea(e.target.value);
    };
    return(
        <AppBar position="static">
            <Toolbar className="list-toolbar">
                <div className="list-toolbar-item">
                <Typography variant="h5" className="list-toolbar-item">
                    {"District:"}
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