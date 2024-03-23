import { Demographics } from "./Demographics";
import DoctorNavBar from "./DoctorNavBar";
import PatientList from "./PatientList";

const DoctorMain = () => {
  return (
    <div className="doctor-main">
      <div>
        <DoctorNavBar />
      </div>
      <div className="doctor-mainp-container">
        <div className="doctor-main-left-cont">
            <PatientList />
        </div>
        <div className="doctor-main-right-cont">
            <Demographics />
        </div>
      </div>
    </div>
  );
};

export default DoctorMain;
