import { Outlet } from "react-router-dom";
// import { SupervisorProvider } from "../../utils/Context/SupervisorContext";
import AdminNavbar from "./AdminNavbar";

const Admin = () => {
    return (
        <div className="list-page">
          <div className="list-page-item"><AdminNavbar/></div>
          <div className="list-page-item">
            <Outlet/>
          </div>
        </div>
    );
}
export default Admin;