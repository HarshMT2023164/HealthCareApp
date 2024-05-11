import React, { useEffect } from 'react'
import ListAppBar from './ListAppBar'
import ViewList from './ViewList'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { SearchProvider } from '../../utils/Context/SearchContext'
import AssignList from './AssignList';

export const AssignListMain = () => {
    const token = localStorage.getItem("JwtToken");
    const navigate = useNavigate();
    const {role} = useParams();

    useEffect(() => {
        if(!token){
            navigate("/");
            return;
        }
    })
    // console.log();
    return (
      <SearchProvider>
          <div>
              <ListAppBar role={role}/>
              <AssignList role={role}/>
          </div>
      </SearchProvider>
  );
}

