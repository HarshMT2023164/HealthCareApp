import { Outlet } from "react-router-dom";
// import { SupervisorProvider } from "../../utils/Context/SupervisorContext";
// import AdminNavbar from "./AdminNavbar";
import DrawerContext from "../../utils/Context/DrawerContext";
import NavBar from "./Navbar";
import { useContext } from "react";

const Admin = () => {

  const {open} = useContext(DrawerContext);
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