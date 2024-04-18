import { Search } from "@mui/icons-material";
import { AppBar, TextField, Toolbar, Typography } from "@mui/material";
import { useContext,useState } from "react";
import SupervisorContext from "../../utils/Context/SupervisorContext";
import axios from "axios";

export default function SupervisorListAppBar(props)
{
    // const {role} = props;
    // const navigate = useNavigate();
    const { searchPatient,setSearchPatient} = useContext(SupervisorContext);

    const handleSearch = (e) => {
        setSearchPatient(e.target.value);
    };
    
const area = localStorage.getItem("AreaName");
const fhw = localStorage.getItem("FHWName");
    return(
        <AppBar position="static">
            <Toolbar className="list-toolbar" >
                <div className="list-toolbar-item">
                <Typography variant="h5" className="list-toolbar-item">
                    {"AreaName: "}{area}
                </Typography>
                </div>
                <div className="list-toolbar-item" style={{paddingLeft:'80px'}}>
                <Typography variant="h5" className="list-toolbar-item" >
                    {"HealthWorkerName: "}{fhw}
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