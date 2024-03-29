import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

const  PrescriptionForm = ({ open, onClose, onSubmit }) =>  {
  const [formData, setFormData] = useState({
    diagnosis: '',
    prescription: '',
    conclusion: ''
  });

  const [errors, setErrors] = useState({
    diagnosis: false,
    prescription: false,
    conclusion: false
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
    onSubmit(formData);
    // Optionally, reset form fields after submission
    setFormData({
      diagnosis: '',
      prescription: '',
      conclusion: ''
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

export default PrescriptionForm;

