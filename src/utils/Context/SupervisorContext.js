import { createContext, useState } from 'react';

const SupervisorContext = createContext();

export const SupervisorProvider = ({ children }) => {
    const [supervisor,setSupervisor] = useState('');
    const [searchArea,setSearchArea] = useState('');
    const [searchFHW,setSearchFHW] = useState('');
    const [searchPatient,setSearchPatient] = useState('');
    return (
    <SupervisorContext.Provider value=
    {
        {
            searchArea,
            setSearchArea,
            searchPatient,
            setSearchPatient,
            searchFHW,
            setSearchFHW,
            supervisor,
            setSupervisor
        }
    }>
        {children}
    </SupervisorContext.Provider>
    );
};

export default SupervisorContext;