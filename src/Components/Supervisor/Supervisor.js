import { Outlet } from "react-router-dom";
// import { SupervisorProvider } from "../../utils/Context/SupervisorContext";
import SupervisorNavBar from "./SupervisorNavbar";

const Supervisor = () => {
    return (
        <div className="list-page">
          <div className="list-page-item"><SupervisorNavBar/></div>
          <div className="list-page-item">
            <Outlet/>
          </div>
        </div>
    );
}
export default Supervisor;