import React from 'react'
import ListAppBar from '../Admin/ListAppBar'
import ViewList from '../Admin/ViewList'
import AreaList from './AreaList'
import { useParams } from 'react-router-dom'
import { SupervisorProvider } from '../../utils/Context/SupervisorContext'
import SupervisorBar from './SupervisorBar'
import "./Supervisor.css"

const SupervisorHome = () => {
    // console.log();
    return (
      <SupervisorProvider>
          <div>
              <SupervisorBar/>
              <AreaList/>
          </div>
      </SupervisorProvider>
  );
}
export default SupervisorHome;

