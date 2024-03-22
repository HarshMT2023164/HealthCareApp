import React from 'react'
import ListAppBar from './ListAppBar'
import ViewList from './ViewList'
import { useParams } from 'react-router-dom'
import { SearchProvider } from '../../utils/Context/SearchContext'

export const ViewListMain = () => {
    const {role} = useParams();
    // console.log();
    return (
      <SearchProvider>
          <div>
              <ListAppBar role={role} />
              <ViewList role={role}/>
          </div>
      </SearchProvider>
  );
}

