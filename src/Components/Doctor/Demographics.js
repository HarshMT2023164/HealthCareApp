import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorMainContext from "../../utils/Context/DoctorMainContext";
import FollowUpForm from "./FollowUpForm";
import PrescriptionForm from "./PrescriptionForm";
import { Card, Divider } from "antd";
import { Surface } from "recharts";

export const Demographics = () => {
  const [demographics, setDemographics] = useState({
    abhaId: "",
    name: "",
    address: "",
    age: "",
    localAreaName: "",
    localAreaPincode: "",
    fhwName: "",
    district: "",
    diagnosis: "",
    icd10Codes: [],
  });
  const { patientDemographics } = useContext(DoctorMainContext);

  const navigate = useNavigate();

  const onViewQuestionnaire = () => {
    navigate("/doctor/viewQuestionnaire");
  };

  const onClickViewHistory = () => {
    navigate("/doctor/history");
  };

  const [openPrescriptionDialog, setOpenPrescriptionDialog] = useState(false);
  const [openFollowUpDialog, setOpenFollowUpDialog] = useState(false);

  useEffect(() => {});

  const handleOpenPrescriptionDialog = () => {
    setOpenPrescriptionDialog(true);
  };

  const handleClosePrescriptionDialog = () => {
    setOpenPrescriptionDialog(false);
  };

  const handleOpenFollowUpDialog = () => {
    setOpenFollowUpDialog(true);
  };

  const handleCloseFollowUpDialog = () => {
    setOpenFollowUpDialog(false);
  };

  const handleSubmitPrescriptionForm = (formData) => {
    // Handle form submission here, e.g., send data to server
    console.log("Prescription Form Submitted:", formData);
  };

  const handleSubmitFollowUpForm = (formData) => {
    // Handle form submission here, e.g., send data to server
    console.log("Prescription Form Submitted:", formData);
  };

  const paperStyle = {
    padding: "24px",
    marginBottom: "24px",
    backgroundColor: "#f0f0f0",
  };

  return (
    <Container>
      {/* <div className="demographic-header">
        <Typography variant="h2" gutterBottom>
          Demographics
        </Typography>
      </div> */}
      {patientDemographics && (
      <div className="demographic-data-cont">
        <div className="demogrphic-btn-cont">
          <Paper elevation={3}>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => onViewQuestionnaire()}
            className="demographic-btn"
          >
            View Questionerry
          </Button>
          </Paper>
          <Paper elevation={3}>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => onClickViewHistory()}
            className="demographic-btn"
          >
            View History
          </Button>
          </Paper>
          <Paper elevation={3}>
          <Button
            variant="outlined"
            size="medium"
            onClick={handleOpenPrescriptionDialog}
            className="demographic-btn"
          >
            Add Prescription
          </Button>
          </Paper>
          <PrescriptionForm
            open={openPrescriptionDialog}
            onClose={handleClosePrescriptionDialog}
            onSubmit={handleSubmitPrescriptionForm}
            dialogData={patientDemographics?.healthRecordDTO}
          />
         <Paper elevation={3}>
          <Button
            variant="outlined"
            size="medium"
            onClick={handleOpenFollowUpDialog}
            className="demographic-btn"
          >
            Add Followup
          </Button>
          </Paper>
          <FollowUpForm
            open={openFollowUpDialog}
            onClose={handleCloseFollowUpDialog}
            onSubmit={handleSubmitFollowUpForm}
          />
        </div>

        <div className="">
          <Paper elevation={3}>
            <Card variant="outlined" sx={{ maxWidth: 360 }}>
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="h4" component="div">
                  Name : {patientDemographics?.name}
                </Typography>
                {/* <Typography gutterBottom variant="h6" component="div">
           
          </Typography> */}

                <Typography color="text.secondary" variant="h6">
                  Age : {patientDemographics?.age}
                </Typography>
                <Typography color="text.secondary" variant="h6">
                  Gender : {patientDemographics?.gender}
                </Typography>
                <Typography color="text.secondary" variant="h6">
                  Address : {patientDemographics?.address}
                </Typography>
                <Typography color="text.secondary" variant="h6">
                  pincode : {patientDemographics?.pincode}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="h4" component="div">
                  Diagnosis Details
                </Typography>
                <Typography color="text.secondary" variant="h6">
                  AbhaId : {patientDemographics.abhaId}
                </Typography>
                {patientDemographics?.healthRecordDTO && (
                  <div>
                    {patientDemographics?.healthRecordDTO?.diagnosis && (
                      <Typography color="text.secondary" variant="h6">
                        Diagnosis :
                        {patientDemographics?.healthRecordDTO?.diagnosis}
                      </Typography>
                    )}
                    {patientDemographics?.healthRecordDTO?.conclusion && (
                      <Typography color="text.secondary" variant="h6">
                        Diagnosis :
                        {patientDemographics?.healthRecordDTO?.conclusion}
                      </Typography>
                    )}
                  </div>
                )}
              </Box>
            </Card>
            </Paper>
        </div>
        {/* {patientDemographics && (
          <div className="demographic-detail-cont">
            <div className="demographic-detail1-cont">
              <Grid container spacing={2}>
                {Object.keys(patientDemographics).map((key) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Typography variant="body1">
                      <span className="demographic-key">{key}</span>:{" "}
                      <span className="demographic-value">
                        {patientDemographics[key]}
                      </span>
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </div>

            <div className="demographic-detail1-cont">
              <Typography variant="body1">
                <div>
                  <span className="demographic-key">
                    Assigned by FieldHealthWorker :{" "}
                  </span>
                  <span className="demographic-value">Harsh</span>
                </div>
                <div>
                  <span className="demographic-key">Assigned On : </span>
                  <span className="demographic-value">23/03/2024</span>
                </div>
              </Typography>
            </div>
            <div className="demographic-detail1-cont">
              <Typography variant="body1">
                <div>
                  <span className="demographic-key">Last checked on : </span>
                  <span className="demographic-value">31/03/2024</span>
                </div>

                <div>
                  <span className="demographic-key">Diagnosis Code : </span>
                  <span className="demographic-value">
                    ICD-10-CM J45.909 (Asthma, unspecified, uncomplicated)
                  </span>
                </div>
              </Typography>
            </div>
          </div>
        )} */}
      </div>
      )}
    </Container>
  );
};
