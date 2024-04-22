import React from 'react'
import ListAppBar from '../Admin/ListAppBar'
import ViewList from '../Admin/ViewList'
import AreaList from './AreaList'
import { useParams } from 'react-router-dom'
// import { SupervisorProvider } from '../../utils/Context/SupervisorContext'
import "./Supervisor.css"
import FHWList from './FHWList'
import FHWListBar from './FHWListBar'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const FHWListMain = () => {
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
              <FHWListBar/>
              <FHWList/>
          </div>
  );
}
export default FHWListMain;

