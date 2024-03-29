import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

const FollowUpForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    instructions: '',
    vitals: '',
    date: ''
  });

  const [errors, setErrors] = useState({
    instructions: false,
    vitals: false,
    date: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      instructions: formData.instructions.trim() === '',
      vitals: formData.vitals.trim() === '',
      date: formData.date.trim() === ''
    };

    setErrors(newErrors);

    // If any field is empty, prevent form submission
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    // Submit form
    console.log('Medical Form Submitted:', formData);

    // Optionally, reset form fields after submission
    setFormData({
      instructions: '',
      vitals: '',
      date: ''
    });
    setErrors({
      instructions: false,
      vitals: false,
      date: false
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
