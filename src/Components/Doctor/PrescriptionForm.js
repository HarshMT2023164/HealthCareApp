import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Chip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { PopperPlacementType } from '@mui/material/Popper';
import { ICD_10_CODES } from '../../utils/constants/StaticList';
import { ADD_PRESCRIPTION, BASE_URL, GET_ICD_CODES, UPDATE_PRESCRIPTION } from '../../utils/constants/URLS';
import axios from 'axios';
import DoctorMainContext from '../../utils/Context/DoctorMainContext';

const PrescriptionForm = ({ open, onClose, onSubmit , dialogData}) => {

  const { patientDemographics } = useContext(DoctorMainContext);

  const [formData, setFormData] = useState({
    diagnosis: '',
    prescription: '',
    conclusion: '',
    icdCodes: []
  });

  const [icdCodesList , setIcdCodesList] = useState([]);

  const [errors, setErrors] = useState({
    diagnosis: false,
    prescription: false,
    conclusion: false
  });

  
  useEffect(() => {
    if(dialogData){
      const icdList = dialogData?.icd10codes;
      setFormData({
        diagnosis : dialogData?.diagnosis,
        conclusion : dialogData?.conclusion,
        prescription : dialogData?.prescriptions[dialogData.prescriptions.length-1],
        icdCodes : icdList
      })
    }
 

    console.log(formData);
    getICDCodes();
   
  },[patientDemographics]);

  const getICDCodes = async() => {
    try{
      const username  = localStorage.getItem("username");
      const token  = localStorage.getItem("JwtToken");
      const response = await axios.get(BASE_URL + GET_ICD_CODES,{
        headers : {
          Authorization : `Bearer ${token}` ,
        } 
      });
        // const response = await axios.get('http://192.168.0.104:8080/doctor/viewDoctors',{
        //   headers : {
        //     Authorization : `Bearer ${token}`,
        //   }
        // });
  
        // Handle the API response
        console.log(response.data);
        console.log(response);
        setIcdCodesList(response.data);
      } catch (error) {
        // Handle errors
        console.log(error)
        // console.error(error);
      }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleICDCodesChange = (event, value) => {
    setFormData(prevState => ({
      ...prevState,
      icdCodes: value
    }));
  };

  const onSubmitFormData = async() => {
    const username  = localStorage.getItem("username");
    const token  = localStorage.getItem("JwtToken");
    const listOfICDIds = formData.icdCodes.map((code) => code.id);
    const reqBody = {
      abhaId : patientDemographics.abhaId,
      workerUsername : patientDemographics.fieldHealthCareWorker.username,
      doctorUsername : username,
      icd10CodeId : listOfICDIds,
      prescription : formData.prescription,
      conclusion : formData.conclusion,
      diagnosis : formData.diagnosis
    }
    let res = await axios.post(
     BASE_URL + UPDATE_PRESCRIPTION ,reqBody,{
      headers : {
        Authorization : `Bearer ${token}` ,
      } 
     }
      ).then((res) => {
          console.log(res);
        if(res){
          // navigate(`/bills/${res?.data?.student_id}`);
          // window.localStorage.setItem('student', JSON.stringify(res.data));
          // window.localStorage.setItem('IsAuthenticated', true);
        }
        else{
          console.log('Username or password incorrect');
        }

      }).catch((err) => {
        console.log('Username or password incorrect');
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitFormData();
    // Validation
    const newErrors = {
      diagnosis: formData.diagnosis.trim() === '',
      prescription: formData.prescription.trim() === '',
      conclusion: formData.conclusion.trim() === ''
    };

    setErrors(newErrors);

    // If any field is empty, prevent form submission
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    // Submit form
    console.log('Prescription Submitted:', formData);
    onSubmitFormData(formData);
    // Optionally, reset form fields after submission
    setFormData({
      diagnosis: '',
      prescription: '',
      conclusion: '',
      icdCodes: []
    });
    setErrors({
      diagnosis: false,
      prescription: false,
      conclusion: false
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Prescription Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Diagnosis"
            fullWidth
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            required
            error={errors.diagnosis}
            helperText={errors.diagnosis ? 'Please enter diagnosis' : ''}
            margin="normal"
          />
          <TextField
            label="Prescription"
            fullWidth
            multiline
            rows={4}
            name="prescription"
            value={formData.prescription}
            onChange={handleChange}
            required
            error={errors.prescription}
            helperText={errors.prescription ? 'Please enter prescription' : ''}
            margin="normal"
          />
          <TextField
            label="Conclusion"
            fullWidth
            multiline
            rows={4}
            name="conclusion"
            value={formData.conclusion}
            onChange={handleChange}
            required
            error={errors.conclusion}
            helperText={errors.conclusion ? 'Please enter conclusion' : ''}
            margin="normal"
          />
          <Autocomplete
            multiple
            id="icdCodes"
            options={icdCodesList} // Your ICD codes list here
            getOptionLabel={(option) => option.name}
            onChange={handleICDCodesChange}
            value={formData.icdCodes}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip key={index} label={option.name} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="ICD Codes"
                placeholder="Select ICD Codes"
              />
            )}
            
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrescriptionForm;
