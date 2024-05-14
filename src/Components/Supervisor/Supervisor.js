import { Outlet } from "react-router-dom";
// import { SupervisorProvider } from "../../utils/Context/SupervisorContext";
import SupervisorNavBar from "./SupervisorNavbar";
import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import DrawerContext from "../../utils/Context/DrawerContext"

const Supervisor = () => {

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
          <div className="list-page-item"><SupervisorNavBar/></div>
          <div className="list-page-item" style={{marginLeft:open?60:-53}}>
            <Outlet/>
          </div>
        </div>
    );
}
export default Supervisor;