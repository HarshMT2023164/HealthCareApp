import { createContext, useState } from "react";

const DoctorMainContext = createContext();

export const DoctorMainProvider = ({ children }) => {
  const [patientDemographics, setPatientDemographics] = useState(null);
  const [selectedStatus, setselectedStatus] = useState(null);
  const [searchText , setSearchText] = useState("");
  const [patientCount, setPatientCount]  = useState(
    {new : 0,
    completed : 0,
    ongoing : 0});

  return (
    <DoctorMainContext.Provider
      value={{
        patientDemographics,
        setPatientDemographics,
        selectedStatus,
        setselectedStatus,
        patientCount,
        setPatientCount,
        searchText,
        setSearchText
     }}
    >
      {children}
    </DoctorMainContext.Provider>
  );
};

export default DoctorMainContext;
