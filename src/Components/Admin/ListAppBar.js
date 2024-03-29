import { Search } from "@mui/icons-material";
import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../utils/Context/SearchContext";

export default function ListAppBar(props)
{
    const {role} = props;
    const navigate = useNavigate();
    const { setSearchText } = useContext(SearchContext);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };


    return(
        <AppBar position="static">
            <Toolbar className="list-toolbar" >
                <div className="list-toolbar-item">
                <Typography variant="h4" className="list-toolbar-item">
                    {role}
                </Typography>
                </div>
                <div className="list-toolbar-item list-toolbar-item-middle">
                    <div><Search/></div>
                    <TextField variant="standard" placeholder="Search here" onChange={handleSearch}/>
                </div>
                    <div className="list-toolbar-item">
                    {role != "Patient" && (<Button variant='contained'  onClick={() => { navigate("admin/register/" + role) }}>Add {role}</Button>)}
                    </div>
            </Toolbar>
        </AppBar>
    );
}