import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorMainContext from "../../utils/Context/DoctorMainContext";
import FollowUpForm from "./FollowUpForm";
import PrescriptionForm from "./PrescriptionForm";

export const Demographics = () => {
  const { patientDemographics } = useContext(DoctorMainContext);

  const navigate = useNavigate();  

  const onViewQuestionnaire = () => {
    navigate("/doctor/viewQuestionnaire")
  }

  const [openPrescriptionDialog, setOpenPrescriptionDialog] = useState(false);
  const [openFollowUpDialog, setOpenFollowUpDialog] = useState(false);

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
    console.log('Prescription Form Submitted:', formData);
  };

  const handleSubmitFollowUpForm = (formData) => {
    // Handle form submission here, e.g., send data to server
    console.log('Prescription Form Submitted:', formData);
  };

 return (
    <Container>
      {/* <div className="demographic-header">
        <Typography variant="h2" gutterBottom>
          Demographics
        </Typography>
      </div> */}
      {patientDemographics && <div className="demographic-data-cont">
      <div className="demogrphic-btn-cont">
        <Button variant="outlined" size="medium" onClick={() => onViewQuestionnaire()}>
          View Questionerry
        </Button>
        <Button variant="outlined" size="medium" onClick={handleOpenPrescriptionDialog}>
          Add/ Edit Prescription
        </Button>
        <PrescriptionForm
        open={openPrescriptionDialog}
        onClose={handleClosePrescriptionDialog}
        onSubmit={handleSubmitPrescriptionForm}
      />

        <Button variant="outlined" size="medium" onClick={handleOpenFollowUpDialog}>
          Add Followup  
        </Button>
        <FollowUpForm
        open={openFollowUpDialog}
        onClose={handleCloseFollowUpDialog}
        onSubmit={handleSubmitFollowUpForm}
      />
      </div>
      <div className="demographic-detail1-cont">
        <Grid container spacing={2}>
          {
            Object.keys(patientDemographics).map((key) => (
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
                  <span className="demographic-key">Assigned by FieldHealthWorker</span>:
                  <span className="demographic-value">
                    Harsh
                  </span>
                  </div>
                  <div>
                  <span className="demographic-key">Assigned On</span>:
                  <span className="demographic-value">
                    23/07/2024
                  </span>
                  </div>
                </Typography>
      </div>
      </div>}
    </Container>
  );
};
