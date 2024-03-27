import React from 'react'
import DoctorSearchBar from './DoctorSearchBar';
import PatientList from './PatientList';
import { Demographics } from './Demographics';

const DoctorLandingScreen = () => {
  return (
    <div className='doctor-landing-cont'>
            <div className="doctor-main">
      <div>
        <DoctorSearchBar />
      </div>
      <div className="doctor-main-container">
        <div className="doctor-main-left-cont">
            <PatientList />
        </div>
        <div className="doctor-main-right-cont">
            <Demographics />
        </div>
      </div>
    </div>
    </div>
  )
}

export default DoctorLandingScreen;