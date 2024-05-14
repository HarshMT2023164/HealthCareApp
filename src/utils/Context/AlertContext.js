import React, { createContext, useState } from 'react';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        type: '',
        message: '',
        visibility: false,
    });

    const showAlert = (type, message) => {
        console.log("From Alert Context");
        setAlert({ type, message, visibility: true });
    };

    const hideAlert = () => {
        setAlert(prevState => ({ ...prevState, visibility: false }));
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export { AlertContext, AlertProvider };
