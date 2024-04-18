import { Outlet } from "react-router-dom";
// import { SupervisorProvider } from "../../utils/Context/SupervisorContext";
import SupervisorNavBar from "./SupervisorNavbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Supervisor = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("JwtToken");
  useEffect(() => {
      if(!token){
          navigate("/");
          return;
      }
  })
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