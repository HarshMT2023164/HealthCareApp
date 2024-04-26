import { Search } from "@mui/icons-material";
import { AppBar, TextField, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import ReceptionistContext from '../../utils/Context/ReceptionistContext';

export default function PatientsListAppBar(props)
{
    const {setSearchPatient} = useContext(ReceptionistContext)

    const handleSearch = (e) => {
        setSearchPatient(e.target.value);
    };
    
const hospital = localStorage.getItem("HospitalName");
const receptionist = localStorage.getItem("ReceptionistName");
    return(
        <AppBar position="static">
            <Toolbar className="list-toolbar" >
                <div className="list-toolbar-item">
                <Typography variant="h5" className="list-toolbar-item">
                    {"Hospital: "}{hospital}
                </Typography>
                </div>
                <div className="list-toolbar-item" style={{paddingLeft:'80px'}}>
                <Typography variant="h5" className="list-toolbar-item" >
                    {"Receptionist: "}{receptionist}
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