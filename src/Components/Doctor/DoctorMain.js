import { Outlet } from "react-router-dom";
import { DoctorMainProvider } from "../../utils/Context/DoctorMainContext";
import "./Doctor.css";
import DoctorNavBar from "./DoctorNavBar";
const DoctorMain = () => {
  return (
    <DoctorMainProvider>
      <div className="list-page">
        <div className="list-page-item">
          <DoctorNavBar />
        </div>
        <div className="list-page-item">
          <Outlet />
        </div>
      </div>
    </DoctorMainProvider>
  );
};

export default DoctorMain;
