import React from 'react';
import { SupervisorProvider } from "../../utils/Context/SupervisorContext";
import AreawisePatientsList from './AreawisePatientsList';
import SupervisorListAppBar from './SupervisorListAppBar';

const AreawisePatientsMain = () => {
    return (
      <SupervisorProvider>
          <div>
              <SupervisorListAppBar  />
              <AreawisePatientsList />
          </div>
      </SupervisorProvider>
  );
}
export default AreawisePatientsMain;
