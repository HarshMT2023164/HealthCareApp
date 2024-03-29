import React from 'react'
// import { SupervisorProvider } from '../../utils/Context/SupervisorContext'
import AreaList from './AreaList'
import "./Supervisor.css"
import SupervisorBar from './SupervisorBar'

const SupervisorHome = () => {
    // console.log();
    return (
          <div>
              <SupervisorBar/>
              <AreaList/>
          </div>
  );
}
export default SupervisorHome;

