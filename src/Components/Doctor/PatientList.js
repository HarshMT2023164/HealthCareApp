import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DoctorMainContext from "../../utils/Context/DoctorMainContext";
import patientListData from "../../utils/constants/PatientList";
import { BASE_URL, GET_PATIENT_LIST } from "../../utils/constants/URLS";
import axios from "axios";

const PatientList = () => {
  const [patientList, setPatientList] = useState([]);
  const [filteredPatientList, setFilteredPatientList] = useState([]);
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
    console.log(patient);
    setPatientDemographics(patient);
    console.log(patientDemographics);
  };

  useEffect(() => {
    const filteredList = patientList.filter((item) =>
      item.abhaId.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPatientList(filteredList);
  }, [searchText]);

  const onSetPatientCount = () => {
    let patientCount = { all: 0, new: 0, completed: 0, ongoing: 0 };
    console.log(patientList);
    patientList.forEach((item) => {
      patientCount[item.status.toLowerCase()]++;
    });
    patientCount.all = patientList.length;
    // console.log(patientCount);
    setPatientCount(patientCount);
  };

  useEffect(() => {
    onSetPatientCount();
  },[patientList])

  const getPatientList = async () => {
    try {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("JwtToken");
      const response = await axios.get(
        BASE_URL + GET_PATIENT_LIST + `?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const response = await axios.get('http://192.168.0.104:8080/doctor/viewDoctors',{
      //   headers : {
      //     Authorization : `Bearer ${token}`,
      //   }
      // });

      // Handle the API response
      console.log(response.data);
      console.log(response);
      if (response.data) {
        setPatientList(response.data);
        setFilteredPatientList(response.data);
        
        if (response.data[0]) setPatientDemographics(response?.data[0]);
        setSelectedCardIndex(0);  
      }
    } catch (error) {
      // Handle errors
      console.log(error);
      // console.error(error);
    }
  };

  useEffect(() => {
    getPatientList();
  }, []);

  useEffect(() => {
    console.log(selectedStatus);
    if (selectedStatus) {
      if (selectedStatus === "all") {
        setFilteredPatientList(patientList);
      } else {
        const updatedPatientList = patientList.filter(
          (item) => item.status.toLowerCase() === selectedStatus.toLowerCase()
        );
        setFilteredPatientList(updatedPatientList);
      }
    }
  }, [selectedStatus]);

  return (
    <div className="patient-list-cont">
      {filteredPatientList.map((patient, index) => (
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
              color: selectedCardIndex === index ? "white" : "black",
              transition: "color 0.3s ease",
            }}
          >
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor:
                      selectedCardIndex === index ? "#FFFFFF" : "#1976d2",
                    transition: "background-color 0.3s ease",
                    color: selectedCardIndex === index ? "#1976d2" : "#FFFFFF",
                    transition: "color 0.3s ease",
                  }}
                  className="patient-card-avatar"
                >
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
                    Abha ID: {patient.abhaId}
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
