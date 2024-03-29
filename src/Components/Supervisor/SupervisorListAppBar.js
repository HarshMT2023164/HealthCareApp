import { Search } from "@mui/icons-material";
import { AppBar, TextField, Toolbar, Typography } from "@mui/material";
import { useContext,useState } from "react";
import SupervisorContext from "../../utils/Context/SupervisorContext";

export default function SupervisorListAppBar(props)
{
    // const {role} = props;
    // const navigate = useNavigate();
    const { searchArea,setSearchArea} = useContext(SupervisorContext);

    const handleSearch = (e) => {
        setSearchArea(e.target.value);
    };


    return(
        <AppBar position="static">
            <Toolbar className="list-toolbar" >
                <div className="list-toolbar-item">
                <Typography variant="h5" className="list-toolbar-item">
                    {"AreaName:"}
                </Typography>
                </div>
                <div className="list-toolbar-item">
                <Typography variant="h5" className="list-toolbar-item">
                    {"HealthWorkerName:"}
                </Typography>
                </div>
                <div className="list-toolbar-item list-toolbar-item-middle">
                    <div><Search/></div>
                    <TextField variant="standard" placeholder="Search here" onChange={handleSearch}/>
                </div>               
            </Toolbar>
        </AppBar>
    );
}