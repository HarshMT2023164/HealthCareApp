import React from 'react';
// import { SupervisorProvider } from "../../utils/Context/SupervisorContext";
import AreawisePatientsList from './AreawisePatientsList';
import SupervisorListAppBar from './SupervisorListAppBar';
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

const AreawisePatientsMain = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("JwtToken");
    useEffect(() => {
        if(!token){
            navigate("/");
            return;
        }
    })
    return (
          <div>
              <SupervisorListAppBar  />
              <AreawisePatientsList />
          </div>
  );
}
export default AreawisePatientsMain;
