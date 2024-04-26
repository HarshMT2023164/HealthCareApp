import { Outlet } from "react-router-dom";
import { ReceptionistProvider } from "../../utils/Context/ReceptionistContext";
import ReceptionistNavBar from "./ReceptionistNavBar";

const ReceptionistMain = () => {
  return (
    <ReceptionistProvider>
      <div className="list-page">
        <div className="list-page-item">
          <ReceptionistNavBar/>
        </div>
        <div className="list-page-item">
          <Outlet />
        </div>
      </div>
    </ReceptionistProvider>
  );
};

export default ReceptionistMain;
