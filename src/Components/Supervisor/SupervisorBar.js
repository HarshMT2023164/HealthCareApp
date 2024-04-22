import { Search } from "@mui/icons-material";
import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import SupervisorContext from '../../utils/Context/SupervisorContext';
import axios from "axios";

export default function SupervisorBar(props)
{
    const dist = localStorage.getItem("district");
    const {role} = props;
    const navigate = useNavigate();
    const {searchArea,setSearchArea} = useContext(SupervisorContext);

    const handleSearch = (e) => {
        setSearchArea(e.target.value);
    };

    const token  = localStorage.getItem("JwtToken");
const username = localStorage.getItem("username");

const reqObj = {
  username:username
}

// useEffect(() => {
    
// },[dist])

// useEffect(() => {
//     fetchListData();
// },[])
// const fetchListData = async () => {

//     try {
//         const response_dist = await axios.post("http://192.168.57.137:8080/supervisor/getByUsername",reqObj,{
//             headers : {
//                   Authorization : `Bearer ${token}`,
//                 }
//           });
//           setDist(response_dist.data.district.name);
//     } catch (error) {
//       // Handle errors
//       console.log(error)
//       // console.error(error);
//     }

   

// }
    return(
        <AppBar position="static">
            <Toolbar className="list-toolbar">
                <div className="list-toolbar-item">
                <Typography variant="h5" className="list-toolbar-item">
                    {"District:  "}{dist}
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