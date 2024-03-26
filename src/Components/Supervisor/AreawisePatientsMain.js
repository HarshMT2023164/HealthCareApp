import React from 'react'
import { SearchProvider } from '../../utils/Context/SearchContext'
import AreawisePatientsList from './AreawisePatientsList'
import SupervisorListAppBar from './SupervisorListAppBar'

const AreawisePatientsMain = () => {
    return (
      <SearchProvider>
          <div>
              <SupervisorListAppBar  />
              <AreawisePatientsList />
          </div>
      </SearchProvider>
  );
}
export default AreawisePatientsMain;
