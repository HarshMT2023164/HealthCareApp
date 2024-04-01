import React, { useState } from 'react';
import {
  Typography,
  Radio,
  FormControlLabel,
  Container,
  Paper,
  Grid,
} from '@mui/material';

const questions = [
  "Over the past two weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
  "Have you experienced a persistent lack of interest or pleasure in activities that you used to enjoy?",
  "How often have you experienced feelings of sadness, hopelessness, or worthlessness over the past two weeks?",
  "Do you find yourself worrying excessively about various aspects of your life, such as work, health, or relationships?",
  "Have you experienced sudden and intense fear or discomfort in social situations where you feel you may be scrutinized or judged by others?",
  "How often do you experience intrusive and distressing thoughts or images that you cannot control?",
  "Have you noticed any changes in your appetite or weight recently?",
  "Do you find it difficult to concentrate or make decisions?",
  "Have you experienced episodes of panic, characterized by sudden and intense fear or discomfort?",
  "How often have you experienced physical symptoms such as headaches, muscle tension, or stomach discomfort due to stress?",
  "Have you noticed any changes in your sleep patterns, such as difficulty falling asleep or staying asleep?",
  "Do you engage in repetitive behaviors or rituals to alleviate distress or anxiety?",
  "Have you experienced a sudden and overwhelming fear of a specific object or situation?",
  "How often have you felt easily irritated or angry over the past two weeks?",
  "Have you noticed any changes in your energy levels, such as feeling unusually tired or lethargic?",
  "Do you experience recurrent thoughts of death or suicide?",
  "How often do you avoid situations or activities because they trigger feelings of fear or anxiety?",
  "Have you experienced periods of feeling detached from yourself or your surroundings?",
  "How often do you engage in behaviors such as excessive hand washing or checking to relieve anxiety?",
  "Have you experienced flashbacks or nightmares related to a traumatic event?",
];

const PatientQuestionnaire = () => {
    const [answers, setAnswers] = useState(
        Array(questions.length).fill('').map(() => {
          const randomIndex = Math.floor(Math.random() * 4);
          return ['A', 'B', 'C', 'D'][randomIndex];
        })
      );
    

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const paperStyle = {
    padding: '24px',

    backgroundColor: '#f0f0f0',
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={10} className='question-paper-cont'>
      <Typography variant="h4" align="center" gutterBottom>
        Patient Questionerry Response 
      </Typography>
      <div className='patient-question-data'>
      <Grid container spacing={2} >
        {questions.map((question, index) => (
          <Grid item xs={12} key={index}>
            <Paper elevation={3} style={paperStyle}>
              <Typography variant="h6">{`${index + 1}. ${question}`}</Typography>
              <FormControlLabel
                value="A"
                control={<Radio color="primary" />}
                label="A) Not at all"
                labelPlacement="end"
                checked={answers[index] === 'A'}
                onChange={() => handleAnswerChange(index, 'A')}
              />
              <FormControlLabel
                value="B"
                control={<Radio color="primary" />}
                label="B) Several days"
                labelPlacement="end"
                checked={answers[index] === 'B'}
                onChange={() => handleAnswerChange(index, 'B')}
              />
              <FormControlLabel
                value="C"
                control={<Radio color="primary" />}
                label="C) More than half the days"
                labelPlacement="end"
                checked={answers[index] === 'C'}
                onChange={() => handleAnswerChange(index, 'C')}
              />
              <FormControlLabel
                value="D"
                control={<Radio color="primary" />}
                label="D) Nearly every day"
                labelPlacement="end"
                checked={answers[index] === 'D'}
                onChange={() => handleAnswerChange(index, 'D')}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      </div>
      </Paper>
    </Container>
  );
};

export default PatientQuestionnaire;
