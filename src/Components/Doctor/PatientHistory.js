import React from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const listItemStyle = {
  marginBottom: '8px',
};

const paperStyle = {
  padding: '24px',
  marginBottom: '24px',
  backgroundColor: '#f0f0f0',
};

const titleStyle = {
  marginBottom: '24px',
  color: '#333',
  fontWeight: 'bold',
};

const PatientHistory = () => {
  const prescriptionFormObject = {
    "Diagnosis Code": "ICD-10-CM J45.909 (Asthma, unspecified, uncomplicated)",
    "Prescription": [
      "Albuterol sulfate inhaler, 2 puffs every 4-6 hours as needed for shortness of breath.",
      "Montelukast sodium tablet, 10mg once daily for maintenance therapy.",
      "Fluticasone propionate nasal spray, 1 spray in each nostril once daily for allergic rhinitis."
    ],
    "Conclusion": "Based on the evaluation and diagnostic tests, the patient presents with uncomplicated asthma. The prescribed medications aim to provide relief from symptoms and manage underlying inflammation. Patient education on proper inhaler technique and asthma triggers is imperative for effective long-term management. Follow-up appointment scheduled in two weeks for reassessment of symptoms and treatment efficacy."
  };

  const medicalData = {
    Instruction: "Please take the prescribed medication as directed by your healthcare provider. Follow the dosage and frequency instructions carefully and do not exceed the recommended dose.",
    "Measure of Vitals": {
      "Blood pressure": "120/80 mmHg",
      "Heart rate": "72 beats per minute",
      "Respiratory rate": "16 breaths per minute",
      "Temperature": "98.6°F (37°C)",
      "Oxygen saturation": "98%"
    },
    Date: "March 29, 2024"
  };
  
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom style={titleStyle}>
        Patient History
      </Typography>
      <Paper elevation={10} style={paperStyle}>
        <Typography variant="h5" style={titleStyle}>
          Prescription
        </Typography>
        <List>
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
        </List>
      </Paper>

      <Paper elevation={10} style={paperStyle}>
        <Typography variant="h5" style={titleStyle}>
          FollowUp
        </Typography>
        <List>
      {Object.entries(medicalData).map(([key, value]) => (
        <ListItem key={key}>
          <ListItemText
            primary={<Typography variant="subtitle1">{key}</Typography>}
            secondary={typeof value === 'object' ? (
              <List>
                {Object.entries(value).map(([subKey, subValue]) => (
                  <ListItem key={subKey}>
                    <ListItemText primary={<Typography variant="body2">{subKey}</Typography>} secondary={<Typography variant="body2">{subValue}</Typography>} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2">{value}</Typography>
            )}
          />
        </ListItem>
      ))}
    </List>
      </Paper>
    </Container>
  );
};

export default PatientHistory;
