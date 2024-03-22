// UserContext.js
import React, { createContext, useState } from 'react';

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  const updateUserDetails = (newUser) => {
    setUserDetails(newUser);
  };

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsContext;
