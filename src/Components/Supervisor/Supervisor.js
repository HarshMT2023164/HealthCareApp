import { Outlet } from "react-router-dom";
import { SupervisorProvider } from "../../utils/Context/SupervisorContext";
import NavBar from "../NavBar";

const Supervisor = () => {
    return (
      <SupervisorProvider>
        <div className="list-page">
          <div className="list-page-item"><NavBar/></div>
          <div className="list-page-item">
            <Outlet/>
          </div>
        </div>
      </SupervisorProvider>
    );
}
export default Supervisor;