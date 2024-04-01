import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DoctorMainContext from "../../utils/Context/DoctorMainContext";
import patientListData from "../../utils/constants/PatientList";

const PatientList = () => {
  const [patientList, setPatientList] = useState(patientListData);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const {
    patientDemographics,
    setPatientDemographics,
    selectedStatus,
    setPatientCount,
    searchText,
  } = useContext(DoctorMainContext);

  const onSelectPatient = (patient, index) => {
    setSelectedCardIndex(index);
    setPatientDemographics(patient);
    console.log(patientDemographics);
  };

  useEffect(() => {
    const filteredList = patientListData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setPatientList(filteredList);
  }, [searchText]);

  const onSetPatientCount = () => {
    let patientCount = { new: 0, completed: 0, ongoing: 0 };
    patientList.forEach((item) => {
      patientCount[item.status]++;
    });
    setPatientCount(patientCount);
  }

  useEffect(() => {
    onSetPatientCount();
    setPatientDemographics(patientList[0]);
  }, []);

  useEffect(() => {
    console.log(selectedStatus);
    if (selectedStatus) {
      const updatedPatientList = patientListData.filter(
        (item) => item.status.toLowerCase() === selectedStatus.toLowerCase()
      );
      setPatientList(updatedPatientList);
    }
  }, [selectedStatus]);

  return (
    <div className="patient-list-cont">
      {patientList.map((patient, index) => (
        <div
          className="patient-card-cont"
          onClick={() => onSelectPatient(patient, index)}
          key={index} // Added key prop for each item in the map
        >
          <Card
            style={{
              backgroundColor:
                selectedCardIndex === index ? "#1976d2" : "white",
              transition: "background-color 0.3s ease",
              color:
                selectedCardIndex === index ? "white" : "black",
              transition: "color 0.3s ease"
            }}
          >
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar style={{ width: 50, height: 50 ,
              backgroundColor:
                selectedCardIndex === index ? "#FFFFFF" : "#1976d2",
              transition: "background-color 0.3s ease",
              color:
                selectedCardIndex === index ? "#1976d2" : "#FFFFFF",
              transition: "color 0.3s ease"}} className="patient-card-avatar">
                  {patient.name.charAt(0)}
                </Avatar>
                <div style={{ marginLeft: 10 }}>
                  <Typography variant="h6" component="div">
                    {patient.name}
                  </Typography>
                  <Typography gutterBottom>
                    Age: {patient.age}, Gender: {patient.gender}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Address: {patient.address}, Pincode: {patient.pincode}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Abha ID: {patient.abha_id}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
