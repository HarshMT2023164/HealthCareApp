import React from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import DoctorsList from './DoctorsList'
import DoctorsListBar from './DoctorsListBar'

const DoctorsListMain = () => {
    // console.log();
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
              <DoctorsListBar/>
              <DoctorsList/>
          </div>
  );
}
export default DoctorsListMain;

