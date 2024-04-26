import { createContext, useState } from 'react';

const ReceptionistContext = createContext();

export const ReceptionistProvider = ({ children }) => {
    const [searchPatient,setSearchPatient] = useState('');
    const [searchDoctor,setSearchDoctor] = useState('');

    return (
    <ReceptionistContext.Provider value=
    {
        {
            searchPatient,
            setSearchPatient,
            searchDoctor,
            setSearchDoctor,
        }
    }>
        {children}
    </ReceptionistContext.Provider>
    );
};

export default ReceptionistContext;