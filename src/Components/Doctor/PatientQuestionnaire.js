// import React, { useContext, useEffect, useState } from 'react';
// import {
//   Typography,
//   Radio,
//   FormControlLabel,
//   Container,
//   Paper,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
// } from '@mui/material';
// import axios from 'axios';
// import { BASE_URL, FETCH_QUESTIONNAIRE, FETCH_RESPONSES } from '../../utils/constants/URLS';
// import { getJwtTokenFromLocal } from '../../utils/constants/UtilFunctions';
// import DoctorMainContext from '../../utils/Context/DoctorMainContext';

// const PatientQuestionnaire = ({ open, onClose}) => {
//   const [data, setData] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [isDisabled, setIsDisabled] = useState(true); // State to control input disable
//   const [score, setScore] = useState(0);
//   const [openDialog, setOpenDialog] = useState(false);
//   const { patientDemographics } = useContext(DoctorMainContext);

//   const fetchResponses = async () => {
//     try {
//       const response = await axios.get(BASE_URL + FETCH_RESPONSES + `?abhaId=${patientDemographics?.abhaId}`, {
//         headers: {
//           Authorization: `Bearer ${getJwtTokenFromLocal()}`,
//         },
//       });
//       console.log(response.data);
//       const toSetAnswers = response?.data?.responses[0].answers.map((ans) => +ans);
//       setAnswers(toSetAnswers);
//       setScore(response.data.score);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchQuestionnaire = async () => {
//     try {
//       const response = await axios.get(BASE_URL + FETCH_QUESTIONNAIRE + `?id=${2}`, {
//         headers: {
//           Authorization: `Bearer ${getJwtTokenFromLocal()}`,
//         },
//       }).then((res) => {
//         setData(res?.data);
//       setQuestions(res?.data?.questions);
//       if(patientDemographics?.abhaId){
//         fetchResponses();
//       }

//       }).catch((err) => {
//         console.log("error fetching responses : ", err)
//       });

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchQuestionnaire();
//   }, [patientDemographics]);

//   const handleAnswerChange = (index, value) => {
//     const newAnswers = [...answers];
//     newAnswers[index] = value;
//     setAnswers(newAnswers);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const paperStyle = {
//     padding: '24px',
//     backgroundColor: '#f0f0f0',
//   };

//   return (
//     data && (

//         <Dialog open={open} onClose={onClose}  maxWidth="md">
//           <DialogTitle>{data.name}</DialogTitle>
//           <DialogContent>
//             <Typography variant="h4" align="center" gutterBottom>
//               Health Score : {score}
//             </Typography>
//             <div className="patient-question-data">
//               <Grid container spacing={2}>
//                 {questions.map((question, index) => (
//                   <Grid item xs={12} key={question.id}>
//                     <Paper elevation={3} style={paperStyle}>
//                       <Typography variant="h6">{`${index + 1}. ${question.questionText}`}</Typography>
//                       {question.optionText.map((option, optionIndex) => (
//                         <FormControlLabel
//                           key={optionIndex}
//                           value={option}
//                           control={<Radio color="primary" />}
//                           label={`${option}`}
//                           labelPlacement="end"
//                           checked={answers[index] === optionIndex}
//                           onChange={() => handleAnswerChange(index, option)}
//                           disabled={isDisabled} // Apply disabled state
//                         />
//                       ))}
//                     </Paper>
//                   </Grid>
//                 ))}
//               </Grid>
//             </div>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => onClose()} color="primary">
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>

//     )
//   );
// };

// export default PatientQuestionnaire;

import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Radio,
  FormControlLabel,
  Container,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";
import {
  BASE_URL,
  FETCH_ALL_QUESTIONNAIRE,
  FETCH_QUESTIONNAIRE,
  FETCH_RESPONSES,
} from "../../utils/constants/URLS";
import { getJwtTokenFromLocal } from "../../utils/constants/UtilFunctions";
import DoctorMainContext from "../../utils/Context/DoctorMainContext";

const PatientQuestionnaire = ({ open, onClose }) => {
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true); // State to control input disable
  const [score, setScore] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // State to track selected tab index
  const { patientDemographics } = useContext(DoctorMainContext);
  const [responses, setResponses] = useState([]);
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(null);
  const [currentResponse, setCurrentResponse] = useState(null);

  const fetchResponses = async () => {
    try {
      const response = await axios.get(
        BASE_URL + FETCH_RESPONSES + `?abhaId=${patientDemographics?.abhaId}`,
        {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromLocal()}`,
            "ngrok-skip-browser-warning": "true"
          },
        }
      );
      console.log(response.data);
      const responsesTemp = response?.data?.responses;
      const responsesMapped = responsesTemp.map((item, id) => {
        let name = "";
        if (id == 0) {
          name = "Register-Questionnarie";
        } else {
          name = "Follow-Up Questionnaire-" + id;
        }
        return { ...item, name: name };
      });
      setResponses(responsesMapped);
      setCurrentTabResponse(responsesMapped, 0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestionnaire = async () => {
    try {
      const response = await axios
        .get(BASE_URL + FETCH_ALL_QUESTIONNAIRE, {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromLocal()}`,
            "ngrok-skip-browser-warning": "true"
          },
        })
        .then((res) => {
          setData(res?.data);
          setCurrentTabQuestionnaire(res?.data, 1);
          if (patientDemographics?.abhaId) {
            fetchResponses();
          }
        })
        .catch((err) => {
          console.log("error fetching responses : ", err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const setCurrentTabQuestionnaire = (datapassed, id) => {
    if (datapassed && datapassed[id]) {
      setCurrentQuestionnaire(datapassed[id]);
      setQuestions(datapassed?.questions);
    }
  };

  const setCurrentTabResponse = (responses, id) => {
    if (responses && responses.length > 0 && responses[id]) {
      const toSetAnswers = responses[id]?.answers?.map((ans) => +ans);
      setAnswers(toSetAnswers);
      setScore(responses[id]?.score);
    }
  };

  const resetData = () => {
    setSelectedTabIndex(0);
    setData(null);
    setResponses([]);
    setAnswers([]);
    setScore(0);
  };

  useEffect(() => {
    resetData();
    fetchQuestionnaire();
  }, [patientDemographics]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const paperStyle = {
    padding: "24px",
    backgroundColor: "white",
    marginBottom: "10px",
    border: "1px solid #1976d2",
    borderRadius: 15,
  };

  const onChangeIndex = (value) => {
    setSelectedTabIndex(value);
    if (value === 0) {
      setCurrentTabQuestionnaire(data, 1);
    } else {
      setCurrentTabQuestionnaire(data, 0);
    }
    setCurrentTabResponse(responses, value);
    console.log(value);
  };

  return (
    data &&
    currentQuestionnaire && responses && responses.length >0 &&(
      <Dialog open={open} onClose={onClose} maxWidth="xl">
        <DialogTitle>{currentQuestionnaire?.name}</DialogTitle>
        <DialogContent>
          <div className="patient-question-data">
            <Grid container spacing={2}>
              <Grid item xs={3} style={{ marginTop: "80px" }}>
                {/* Vertical Tabs */}
                {responses && responses.length > 0 && (
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={selectedTabIndex}
                    onChange={(event, newValue) => onChangeIndex(newValue)}
                  >
                    {/* Render tabs for each questionnaire */}
                    {responses.map((item, index) => (
                      <Tab key={index} label={item.name} />
                    ))}
                  </Tabs>
                )}
              </Grid>
              <Grid item xs={9} className="doctor-questionnaire-panel">
                <Typography variant="h4" align="center" gutterBottom>
                  Health Score : {score}
                </Typography>
                {/* Render questionnaire based on selected tab */}
                {currentQuestionnaire?.questions?.map((question, index) => (
                  <Paper elevation={3} style={paperStyle} key={question.id}>
                    <Typography variant="h6">{`${index + 1}. ${
                      question.questionText
                    }`}</Typography>
                    {question?.optionText?.map((option, optionIndex) => (
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
                ))}
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default PatientQuestionnaire;
