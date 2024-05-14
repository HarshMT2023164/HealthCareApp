import { Outlet } from "react-router-dom";
// import { SupervisorProvider } from "../../utils/Context/SupervisorContext";
// import AdminNavbar from "./AdminNavbar";
import DrawerContext from "../../utils/Context/DrawerContext";
import NavBar from "./Navbar";
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const {open} = useContext(DrawerContext);
  const token = localStorage.getItem("JwtToken");
  useEffect(() => {
    if(!token){
        navigate("/");
        return;
    }
})
    return (
        <div className="list-page">
          <div className="list-page-item"><NavBar/></div>
          <div className="list-page-item" style={{marginLeft:open?60:-53}}>
            <Outlet/>
          </div>
        </div>
    );
}
export default Admin;