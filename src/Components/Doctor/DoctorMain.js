import { Outlet } from "react-router-dom";
import { DoctorMainProvider } from "../../utils/Context/DoctorMainContext";
import DrawerContext from "../../utils/Context/DrawerContext"
import { useContext } from "react";
//import "./Doctor.css";
import DoctorNavBar from "./DoctorNavBar";
const DoctorMain = () => {
  const {open} = useContext(DrawerContext);
  return (
    <DoctorMainProvider>
      <div className="list-page">
        <div className="list-page-item">
          <DoctorNavBar />
        </div>
        <div className="list-page-item-doctor" style={{marginLeft:open?60:-54}}>
            <Outlet/>
          </div>
      </div>
    </DoctorMainProvider>
  );
};

export default DoctorMain;
