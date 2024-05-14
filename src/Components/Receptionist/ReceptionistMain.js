import { Outlet } from "react-router-dom";
import { ReceptionistProvider } from "../../utils/Context/ReceptionistContext";
import ReceptionistNavBar from "./ReceptionistNavBar";
import DrawerContext from "../../utils/Context/DrawerContext";
import { useContext } from "react";

const ReceptionistMain = () => {

  const {open} = useContext(DrawerContext);
  return (
    <ReceptionistProvider>
      <div className="list-page">
        <div className="list-page-item">
          <ReceptionistNavBar/>
        </div>
        <div className="list-page-item" style={{marginLeft:open?60:-53}}>
            <Outlet/>
          </div>
      </div>
    </ReceptionistProvider>
  );
};

export default ReceptionistMain;
