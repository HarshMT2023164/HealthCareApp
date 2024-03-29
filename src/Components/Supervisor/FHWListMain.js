import React from 'react'
import ListAppBar from '../Admin/ListAppBar'
import ViewList from '../Admin/ViewList'
import AreaList from './AreaList'
import { useParams } from 'react-router-dom'
// import { SupervisorProvider } from '../../utils/Context/SupervisorContext'
import "./Supervisor.css"
import FHWList from './FHWList'
import FHWListBar from './FHWListBar'

const FHWListMain = () => {
    // console.log();
    return (
          <div>
              <FHWListBar/>
              <FHWList/>
          </div>
  );
}
export default FHWListMain;

