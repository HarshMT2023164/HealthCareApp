import { DoctorMainProvider } from "../../utils/Context/DoctorMainContext";
import { Demographics } from "./Demographics";
import DoctorSearchBar from "./DoctorSearchBar";
import PatientList from "./PatientList";
import "./Doctor.css";
import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";
import DoctorNavBar from "./DoctorNavBar";
const DoctorMain = () => {
  return (
    <DoctorMainProvider>
      <div className="list-page">
      <div className="list-page-item"> <DoctorNavBar /></div>
      <div className="list-page-item">
        <Outlet />
      </div>
    </div>
    </DoctorMainProvider>
  );
};

export default DoctorMain;
