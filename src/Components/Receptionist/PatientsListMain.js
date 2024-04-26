import React from 'react';
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import PatientsListAppBar from './PatientsListBar';
import PatientsList from './PatientsList'

const PatientsListMain = () => {

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
              <PatientsListAppBar/>
              <PatientsList/>
          </div>
  );
}
export default PatientsListMain;
