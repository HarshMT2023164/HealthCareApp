import React, { useContext, useEffect, useState } from 'react';
import {
  Typography,
  Radio,
  FormControlLabel,
  Container,
  Paper,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { BASE_URL, FETCH_QUESTIONNAIRE, FETCH_RESPONSES } from '../../utils/constants/URLS';
import { getJwtTokenFromLocal } from '../../utils/constants/UtilFunctions';
import DoctorMainContext from '../../utils/Context/DoctorMainContext';

const PatientQuestionnaire = () => {
  const [data , setData]  = useState(null);
  const [answers, setAnswers] = useState(Array(data?.questions?.length).fill(null));
  const [questions, setQuestions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true); // State to control input disable
 
  const {patientDemographics} = useContext(DoctorMainContext);


  const fetchResponses = async () => {
    try {
      const response = await axios.get(BASE_URL + FETCH_RESPONSES + `?abhaId=${patientDemographics?.abhaId}`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromLocal()}`,
        },
      });
      console.log(response.data);
      const toSetAnswers = response?.data?.answers.map((ans) => +ans );
      setAnswers(toSetAnswers);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchQuestionnaire = async () => {
    try {
      const response = await axios.get(BASE_URL + FETCH_QUESTIONNAIRE + `?id=${2}`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromLocal()}`,
        },
      });
      setData(response?.data);
      setQuestions(response?.data?.questions);
      fetchResponses();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuestionnaire();
  }, [patientDemographics]);

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
    data && (
      <Container maxWidth="md">
      <Paper elevation={10} className='question-paper-cont'>
        <Typography variant="h4" align="center" gutterBottom>
          {data?.name}
        </Typography>
        <div className='patient-question-data'>
          <Grid container spacing={2}>
            {questions.map((question, index) => (
              <Grid item xs={12} key={question.id}>
                <Paper elevation={3} style={paperStyle}>
                  <Typography variant="h6">{`${question.id}. ${question.questionText}`}</Typography>
                  {question.optionText.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={option}
                      control={<Radio color="primary" />}
                      label={`${option}`}
                      labelPlacement="end"
                      checked={answers[index] === optionIndex}
                      onChange={() => handleAnswerChange(index, option)}
                      disabled={isDisabled} // Apply disabled state
                    />
                  ))}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </Paper>
    </Container>
    )
   
  );
};

export default PatientQuestionnaire;
