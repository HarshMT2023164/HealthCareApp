import { Search } from "@mui/icons-material";
import { AppBar,TextField, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import ReceptionistContext from "../../utils/Context/ReceptionistContext";

export default function DoctorsListBar()
{

    const {setSearchDoctor} = useContext(ReceptionistContext);

    const handleSearch = (e) => {
        setSearchDoctor(e.target.value);
    };
    return(
        <AppBar position="static">
            <Toolbar className="list-toolbar">
                <div className="list-toolbar-item">
                <Typography variant="h5" className="list-toolbar-item">
                    {"Available Doctors:"}
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