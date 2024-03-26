import { createContext, useState } from 'react';

const SupervisorContext = createContext();

export const SupervisorProvider = ({ children }) => {
    const [searchArea, setSearchArea] = useState('');
    const [searchPatient, setSearchPatient] = useState('');

    return (
    <SupervisorContext.Provider value=
    {
        {   searchArea, 
            setSearchArea,
            searchPatient,
            setSearchPatient 
        }
    }>
        {children}
    </SupervisorContext.Provider>
    );
};

export default SupervisorContext;