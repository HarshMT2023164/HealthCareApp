import React from 'react'
// import { SupervisorProvider } from '../../utils/Context/SupervisorContext'
import AreaList from './AreaList'
import "./Supervisor.css"
import SupervisorBar from './SupervisorBar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const SupervisorHome = () => {
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
              <SupervisorBar/>
              <AreaList/>
          </div>
  );
}
export default SupervisorHome;

