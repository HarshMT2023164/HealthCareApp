import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Chip, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { ICD_10_CODES } from '../../utils/constants/StaticList';
import { ADD_PRESCRIPTION, BASE_URL, GET_ICD_CODES, UPDATE_PRESCRIPTION } from '../../utils/constants/URLS';
import axios from 'axios';
import DoctorMainContext from '../../utils/Context/DoctorMainContext';

const PrescriptionForm = ({ open, onClose, onSubmit, dialogData }) => {
  const { patientDemographics } = useContext(DoctorMainContext);

  const [formData, setFormData] = useState({
    diagnosis: '',
    prescriptions: [{
      medication: '',
      dosage: '',
      medicationType: '',
      frequency: '',
      customFrequency: '',
      customInstructions: ''
    }],
    conclusion: '',
    icdCodes: []
  });

  const [icdCodesList, setIcdCodesList] = useState([]);
  const [errors, setErrors] = useState({
    diagnosis: false,
    conclusion: false,
    prescriptions: []
  });

  useEffect(() => {
    if (dialogData) {
      console.log(dialogData);
      const icdList = dialogData?.icd10codes;
      setFormData({
        diagnosis: dialogData?.diagnosis,
        conclusion: dialogData?.conclusion,
        prescriptions: dialogData?.prescriptions || [{}],
        icdCodes: icdList
      });
    } else {
      setFormData({
        diagnosis: '',
        prescriptions: [{
          medication: '',
          dosage: '',
          medicationType: '',
          frequency: '',
          customFrequency: '',
          customInstructions: ''
        }],
        conclusion: '',
        icdCodes: []
      });
    }

    console.log(formData);
    getICDCodes();
  }, [patientDemographics]);

  const getICDCodes = async () => {
    try {
      const token = localStorage.getItem("JwtToken");
      const response = await axios.get(BASE_URL + GET_ICD_CODES, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setIcdCodesList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // const handleChange = (e, index) => {
  //   const { name, value } = e.target;

  //   if (name.startsWith("prescriptions")) {
  //     const newPrescriptions = [...formData.prescriptions];
  //     newPrescriptions[index] = {
  //       ...newPrescriptions[index],
  //       [name.split(".")[2]]: value
  //     };
  //     console.log(name.split(".")[2]);
  //     setFormData(prevState => ({
  //       ...prevState,
  //       prescriptions: newPrescriptions
  //     }));
  //   } else {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [name]: value
  //     }));
  //   }
  // };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
  
    if (name.startsWith("prescriptions")) {
      const newPrescriptions = [...formData.prescriptions];
      newPrescriptions[index] = {
        ...newPrescriptions[index],
        [name.split(".")[2]]: value
      };
  
      // Clear customFrequency if Frequency is not null
      if (name.split(".")[2] === "frequency" && value !== "NONE") {
        newPrescriptions[index].customFrequency = '';
      }

      if (name.split(".")[2] === "customFrequency" && value.length>0) {
        newPrescriptions[index].frequency = "";
      }
  
      setFormData(prevState => ({
        ...prevState,
        prescriptions: newPrescriptions
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  

  const addPrescription = () => {
    setFormData(prevState => ({
      ...prevState,
      prescriptions: [
        ...prevState.prescriptions,
        {
          medication: '',
          dosage: '',
          medicationType: '',
          frequency: '',
          customFrequency: '',
          customInstructions: ''
        }
      ]
    }));
  };

  const removePrescription = (index) => {
    const newPrescriptions = [...formData.prescriptions];
    newPrescriptions.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      prescriptions: newPrescriptions
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
    const mappedPrescriptions = formData.prescriptions.map((item) =>{
      let newItem = item;
      newItem.customFrequency = item.customFrequency.trim() ==="" ? null : item.customFrequency;
      return newItem;
    }) 
    const reqBody = {
      abhaId : patientDemographics.abhaId,
      workerUsername : patientDemographics.fieldHealthCareWorker.username,
      doctorUsername : username,
      icd10CodeId : listOfICDIds,
      prescription : mappedPrescriptions,
      conclusion : formData.conclusion,
      diagnosis : formData.diagnosis
    }
    let postUrl = dialogData ? UPDATE_PRESCRIPTION : ADD_PRESCRIPTION
    let res = await axios.post(
     BASE_URL + postUrl ,reqBody,{
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
          console.log('cannot add prescription');
        }

      }).catch((err) => {
        console.log('Error adding prescription');
      })
  }

  const handleSubmit = () => {
    console.log(formData);
    const newErrors = {
      diagnosis: formData.diagnosis.trim() === '',
      conclusion: formData.conclusion.trim() === '',
      prescriptions: formData.prescriptions.map(p => ({
        medication: p.medication.trim() === '',
        dosage: p.dosage.trim() === '',
        medicationType: p.medicationType.trim() === '',
        frequency: p.frequency.trim() === '',
        // customFrequency: p.customFrequency.trim() === '',
        customInstructions: p.customInstructions.trim() === ''
      }))
    };

    setErrors(newErrors);

    // if (Object.values(newErrors).some(error => error)) {
    //   return;
    // }

    onSubmitFormData();
    setFormData({
      diagnosis: '',
      prescriptions: [{
        medication: '',
        dosage: '',
        medicationType: '',
        frequency: '',
        customFrequency: '',
        customInstructions: ''
      }],
      conclusion: '',
      icdCodes: []
    });
    setErrors({
      diagnosis: false,
      conclusion: false,
      prescriptions: []
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" style={{maxHeight: "90vh"}}>
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
            className='prescription-text-field'
          />
          {formData.prescriptions.map((prescription, index) => (
            <div key={index}>
              <TextField
                label="Medication"
                fullWidth
                name={`prescriptions.${index}.medication`}
                value={prescription.medication}
                onChange={(e) => handleChange(e, index)}
                required
                error={errors.prescriptions[index]?.medication}
                helperText={errors.prescriptions[index]?.medication ? 'Please enter medication' : ''}
                className='prescription-text-field'
              />
              <TextField
                label="Dosage"
                fullWidth
                name={`prescriptions.${index}.dosage`}
                value={prescription.dosage}
                onChange={(e) => handleChange(e, index)}
                required
                error={errors.prescriptions[index]?.dosage}
                helperText={errors.prescriptions[index]?.dosage ? 'Please enter dosage' : ''}
                className='prescription-text-field'
              />
              <TextField fullWidth select error={errors.prescriptions[index]?.medicationType} className='prescription-text-field'
              label="Medication Type" value={prescription.medicationType}
              onChange={(e) => handleChange(e, index)}
              name={`prescriptions.${index}.medicationType`}
              required>
                  <MenuItem value="">Select Medication Type</MenuItem>
                  <MenuItem value="TABLET">TABLET</MenuItem>
                  <MenuItem value="LIQUID">LIQUID</MenuItem>
                  <MenuItem value="INJECTION">INJECTION</MenuItem>
                  {/* Add more medication types as needed */}

              </TextField>
              <TextField
                label="Frequency"
                fullWidth
                select
                name={`prescriptions.${index}.frequency`}
                value={prescription.frequency}
                onChange={(e) => handleChange(e, index)}
                required
                error={errors.prescriptions[index]?.frequency}
                helperText={errors.prescriptions[index]?.frequency ? 'Please select frequency' : ''}
                className='prescription-text-field'
              >
                 <MenuItem value="">Select Frequency</MenuItem>
                  <MenuItem value="NONE">None</MenuItem>
                  <MenuItem value="ONCE_DAILY">Once Daily</MenuItem>
                  <MenuItem value="TWICE_DAILY">Twice Daily</MenuItem>
                  <MenuItem value="THREE_TIMES_DAILY">Three Times Daily</MenuItem>
                  <MenuItem value="ONCE_WEEKLY">Once Weekly</MenuItem>
                  <MenuItem value="AS_NEEDED">As Needed</MenuItem>
                {/* Add more frequency options as needed */}
              </TextField>
              <TextField
                label="Custom Frequency"
                fullWidth
                name={`prescriptions.${index}.customFrequency`}
                value={prescription.customFrequency}
                onChange={(e) => handleChange(e, index)}
                className='prescription-text-field'
              />
              <TextField
                label="Custom Instructions"
                fullWidth
                name={`prescriptions.${index}.customInstructions`}
                value={prescription.customInstructions}
                onChange={(e) => handleChange(e, index)}
                className='prescription-text-field'
              />
              {index !== 0 && (
                <Button onClick={() => removePrescription(index)}>Remove Prescription</Button>
              )}
            </div>
          ))}
          <Button onClick={addPrescription}>Add Prescription</Button>
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
            className='prescription-text-field'
          />
          <Autocomplete
            multiple
            id="icdCodes"
            className='prescription-text-field'
            options={icdCodesList}
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
        <Button onClick={() => handleSubmit()} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrescriptionForm;
