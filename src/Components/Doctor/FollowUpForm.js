import React, { useContext, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { ADD_FOLLOWUP, BASE_URL } from '../../utils/constants/URLS';
import DoctorMainContext from '../../utils/Context/DoctorMainContext';
import axios from 'axios';

const FollowUpForm = ({ open, onClose, onSubmit }) => {
  const { patientDemographics } = useContext(DoctorMainContext);
  const [formData, setFormData] = useState({
    instructions: '',
    vitals: '',
    date: '',
    frequency: '',
    endDate: ''
  });

  const [errors, setErrors] = useState({
    instructions: false,
    vitals: false,
    date: false,
    frequency: false,
    endDate: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmitForm = async() => {
    const token  = localStorage.getItem("JwtToken");
    const reqBody = {
  
      healthRecordId: +patientDemographics.healthRecordDTO.id,
      workerUsername : patientDemographics.fieldHealthCareWorker.username,
      datem : formData.date,
      scheduledDateTimem : formData.endDate,
      instructions : formData.instructions,
      frequency : formData.frequency.toUpperCase(),
    }
    let res = await axios.post(
     BASE_URL + ADD_FOLLOWUP ,reqBody,{
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
 
    // Validation
    const newErrors = {
      instructions: formData.instructions.trim() === '',
      vitals: formData.vitals.trim() === '',
      date: formData.date.trim() === '',
      frequency: formData.frequency.trim() === '',
      endDate: formData.endDate.trim() === ''
    };

    setErrors(newErrors);

    // If any field is empty, prevent form submission
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    // Submit form
    console.log('Medical Form Submitted:', formData);

    onSubmitForm();

    // Optionally, reset form fields after submission
    setFormData({
      instructions: '',
      vitals: '',
      date: '',
      frequency: '',
      endDate: ''
    });
    setErrors({
      instructions: false,
      vitals: false,
      date: false,
      frequency: false,
      endDate: false
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>FollowUp Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Instructions"
            fullWidth
            multiline
            rows={4}
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
            error={errors.instructions}
            helperText={errors.instructions ? 'Please enter instructions' : ''}
            margin="normal"
          />
          <TextField
            label="Measure of Vitals"
            fullWidth
            multiline
            rows={4}
            name="vitals"
            value={formData.vitals}
            onChange={handleChange}
            required
            error={errors.vitals}
            helperText={errors.vitals ? 'Please enter measure of vitals' : ''}
            margin="normal"
          />
          <TextField
            label="Date"
            fullWidth
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            error={errors.date}
            helperText={errors.date ? 'Please enter date' : ''}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Frequency"
            fullWidth
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
            error={errors.frequency}
            helperText={errors.frequency ? 'Please select frequency' : ''}
            margin="normal"
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </TextField>
          <TextField
            label="End Date"
            fullWidth
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            error={errors.endDate}
            helperText={errors.endDate ? 'Please enter end date' : ''}
            margin="normal"
            InputLabelProps={{ shrink: true }}
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
}

export default FollowUpForm;
