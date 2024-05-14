import React, { useContext, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { ADD_FOLLOWUP, BASE_URL } from '../../utils/constants/URLS';
import DoctorMainContext from '../../utils/Context/DoctorMainContext';
import axios from 'axios';
import { format } from 'date-fns';
const FollowUpForm = ({ open, onClose, onSubmit }) => {
  const { patientDemographics } = useContext(DoctorMainContext);
  const [formData, setFormData] = useState({
    instructions: '',
    date: '',
    frequency: '',
    endDate: ''
  });

  const [errors, setErrors] = useState({
    instructions: false,
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

  const onSubmitForm = async () => {
    const token = localStorage.getItem("JwtToken");
    const reqBody = {
      healthRecordId: +patientDemographics.healthRecordDTO.id,
      workerUsername: patientDemographics.fieldHealthCareWorker.username,
      scheduledDateTime: formData.date,
      recurrenceEndTime: formData.endDate,
      instructions: formData.instructions,
      frequency: formData.frequency.toUpperCase(),
    };
  
    // Format dates if needed before sending
    reqBody.scheduledDateTime = format(new Date(formData.date), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    reqBody.recurrenceEndTime = format(new Date(formData.endDate), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  
    try {
      const res = await axios.post(BASE_URL + ADD_FOLLOWUP, reqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        }
      });
      console.log(res.data);
      // Handle success or navigate to another page
      onSubmit(); // Call the onSubmit callback passed as prop
      onClose(); // Close the dialog
    } catch (error) {
      console.log('Error submitting follow-up:', error);
      // Handle error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      instructions: formData.instructions.trim() === '',
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
      date: '',
      frequency: '',
      endDate: ''
    });
    setErrors({
      instructions: false,
      date: false,
      frequency: false,
      endDate: false
    });
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
            <MenuItem value="NONE">None</MenuItem>
            <MenuItem value="DAILY">Daily</MenuItem>
            <MenuItem value="WEEKLY">Weekly</MenuItem>
            <MenuItem value="TWICE_A_WEEK">Twice a Week</MenuItem>
            <MenuItem value="ALTERNATE_DAY">Alternate Day</MenuItem>
            <MenuItem value="EVERY_FEW_DAYS">Every Few Days</MenuItem>
            <MenuItem value="MONTHLY">Monthly</MenuItem>
            <MenuItem value="TWICE_A_MONTH">Twice a Month</MenuItem>
            <MenuItem value="ALTERNATE_MONTH">Alternate Month</MenuItem>
            <MenuItem value="EVERY_FEW_WEEKS">Every Few Weeks</MenuItem>
            <MenuItem value="QUARTERLY">Quarterly</MenuItem>
            <MenuItem value="BIANNUALLY">Biannually</MenuItem>
            <MenuItem value="ANNUALLY">Annually</MenuItem>
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
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FollowUpForm;
