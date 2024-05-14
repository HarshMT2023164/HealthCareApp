import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import DoctorMainContext from "../../utils/Context/DoctorMainContext";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const listItemStyle = {
  marginBottom: "8px",
};

const paperStyle = {
  padding: "24px",
  marginBottom: "24px",
  backgroundColor: "#f0f0f0",
};

const titleStyle = {
  marginBottom: "24px",
  color: "#333",
  fontWeight: "bold",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const PatientHistory = ({ open, onClose }) => {
  const { patientDemographics } = useContext(DoctorMainContext);
  const [healthRecord, setHealthRecord] = useState(null);
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    console.log(patientDemographics);
    setData();
  }, [patientDemographics]);

  const setData = () => {
    if (patientDemographics && patientDemographics.healthRecordDTO) {
      setHealthRecord(patientDemographics.healthRecordDTO);
    }
    if (
      patientDemographics &&
      patientDemographics.healthRecordDTO &&
      patientDemographics.healthRecordDTO.followUps
    ) {
      setFollowUps(patientDemographics.healthRecordDTO.followUps);
    }
  };
  const getDate = (inputDate) => {
const date = new Date(inputDate);
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
const year = date.getFullYear();

const formattedDate = `${day}-${month}-${year}`;
return formattedDate;
}

  const prescriptionFormObject = {
    "Diagnosis Code": "ICD-10-CM J45.909 (Asthma, unspecified, uncomplicated)",
    Prescription: [
      "Albuterol sulfate inhaler, 2 puffs every 4-6 hours as needed for shortness of breath.",
      "Montelukast sodium tablet, 10mg once daily for maintenance therapy.",
      "Fluticasone propionate nasal spray, 1 spray in each nostril once daily for allergic rhinitis.",
    ],
    Conclusion:
      "Based on the evaluation and diagnostic tests, the patient presents with uncomplicated asthma. The prescribed medications aim to provide relief from symptoms and manage underlying inflammation. Patient education on proper inhaler technique and asthma triggers is imperative for effective long-term management. Follow-up appointment scheduled in two weeks for reassessment of symptoms and treatment efficacy.",
  };

  const medicalData = {
    Instruction:
      "Please take the prescribed medication as directed by your healthcare provider. Follow the dosage and frequency instructions carefully and do not exceed the recommended dose.",
    "Measure of Vitals": {
      "Blood pressure": "120/80 mmHg",
      "Heart rate": "72 beats per minute",
      "Respiratory rate": "16 breaths per minute",
      Temperature: "98.6°F (37°C)",
      "Oxygen saturation": "98%",
    },
    Date: "March 29, 2024",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl">
        
        <DialogContent>
    {/* <Container maxWidth="md"> */}
      <Typography variant="h4" align="center" gutterBottom style={titleStyle}>
        Patient History
      </Typography>
      {healthRecord && (
         <Paper elevation={10} style={paperStyle}>
         <Typography variant="h5" style={titleStyle}>
           Health Record
         </Typography>
         <Typography color="text.primary" variant="h6" className="history-key-headers">
           Diagnosis : {healthRecord?.diagnosis}
         </Typography>
         <Typography color="text.primary" variant="h6" className="history-key-headers">
           Prescription :
         </Typography>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell >Medication</StyledTableCell>
            <StyledTableCell >MedicationType</StyledTableCell>
            <StyledTableCell >dosage</StyledTableCell>
            <StyledTableCell >frequency</StyledTableCell>
            <StyledTableCell>Instructions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {healthRecord?.prescriptions?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row?.id}
              </StyledTableCell>
              <StyledTableCell >{row?.medication}</StyledTableCell>
              <StyledTableCell>{row?.medicationType}</StyledTableCell>
              <StyledTableCell>{row?.dosage}</StyledTableCell>
              <StyledTableCell>{row?.frequency}</StyledTableCell>
              <StyledTableCell>{row?.customInstructions}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Typography color="text.primary" variant="h6" className="history-key-headers">
           ICD10Codes :
         </Typography>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Code</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {healthRecord?.icd10codes?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row?.id}
              </StyledTableCell>
              <StyledTableCell >{row?.code }</StyledTableCell>
              <StyledTableCell >{row?.name}</StyledTableCell>
              <StyledTableCell >{row?.description}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



       </Paper>
      )}
     
      {followUps.map((followUp,index) => {
        return(
          <Paper elevation={10} style={paperStyle}>
        <Typography variant="h5" style={titleStyle}>
          FollowUp-{index+1}
        </Typography>
        <Typography color="text.primary" variant="h6" className="history-key-headers">
        Instructions : {followUp?.instructions}
         </Typography>
         <Typography color="text.primary" variant="h6" className="history-key-headers">
         MeasureOfVitals : {followUp?.measureOfVitals}
         </Typography>
         <Typography color="text.primary" variant="h6" className="history-key-headers">
           conducted on : {followUp?.date && getDate(followUp.date)}
         </Typography>
      </Paper>
        )
      }) }
      
    {/* </Container> */}
    </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default PatientHistory;

{
  /* <List>
          {Object.entries(prescriptionFormObject).map(([key, value]) => (
            <ListItem key={key} style={listItemStyle}>
              <ListItemText primary={<Typography variant="subtitle1">{key}</Typography>} secondary={Array.isArray(value) ? (
                <List>
                  {value.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={<Typography variant="body2">{item}</Typography>} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2">{value}</Typography>
              )} />
            </ListItem>
          ))}
        </List> */
}
