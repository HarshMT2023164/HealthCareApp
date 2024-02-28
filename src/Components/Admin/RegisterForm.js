import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RegisterForm = () => {
  const initialFormState = {
    name: "",
    email: "",
    licenseId: "",
    phonenumber: "",
    district: null, // Change this based on your district options structure
    gender: "",
    age: "",
    specialty : "psychiatrist"
  };

  const [formData, setFormData] = useState(initialFormState);

  const navigate = useNavigate();

  const {role} = useParams();

   

  const handleSubmitValidated = async () => {
    // let res = await axios.post(        
    //   "http://192.168.0.104:8080/doctor/addDoctor",formData
    //   ).then((res) => {
    //       console.log(res);
    //     if(res){
    //       // navigate(`/bills/${res?.data?.student_id}`);
    //       // window.localStorage.setItem('student', JSON.stringify(res.data));
    //       // window.localStorage.setItem('IsAuthenticated', true);
    //     }
    //     else{
    //       console.log('Username or password incorrect');
    //     }
        
    //   }).catch((err) => {
    //     console.log('Username or password incorrect');
    //   })
      navigate("/viewList/" + role);
  };


  const paperStyle = {
    padding: 20,
    width: 600,
    margin: "100px auto",
  };

  const textFieldStyle = {
    margin: "10px auto",
  };

  const districtOptions = [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad"
    // Add more districts as needed
  ];

  // const handleBlur = (event) => {
  //   const { name, value } = event.target;
  //   if (!validateEmail(name === "email")) {
  //     setErrors({
  //       ...errors,
  //       email: "Enter valid email",
  //     });
  //   } else {
  //     setErrors("");
  //   }
  // };

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    licenseId: "",
    phonenumber: "",
    district: "",
    gender: "",
    age: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear validation error for the field on input change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleDistrictChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      district: newValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      district: "",
    }));
  };

  const handleGenderChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: event.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      gender: "",
    }));
  };

  const handleSubmit = () => {
    // Validate form fields before submitting
    const validationErrors = {};

    Object.keys(formData).forEach((fieldName) => {
      switch (fieldName) {
        case "name":
          if (!formData[fieldName]) {
            validationErrors[fieldName] = "Full name is required";
          }
          break;
        case "email":
          if (!formData[fieldName] || !validateEmail(formData[fieldName])) {
            validationErrors[fieldName] = "Enter a valid email address";
          }
          break;
        case "licenseId":
          if (!formData[fieldName]) {
            validationErrors[fieldName] = "License is required";
          }
          break;
        case "phonenumber":
          if (!formData[fieldName]) {
            validationErrors[fieldName] = "Phone number is required";
          }
          break;
        case "district":
          if (!formData[fieldName]) {
            validationErrors[fieldName] = "District is required";
          }
          break;
        case "gender":
          if (!formData[fieldName]) {
            validationErrors[fieldName] = "Gender is required";
          }
          break;
        case "age":
          if (!formData[fieldName]) {
            validationErrors[fieldName] = "Age is required";
          }
          break;
        default:
          break;
      }
    });

    // Set validation errors in state
    setErrors(validationErrors);
    validationErrors.email = "Email already exists";
    validationErrors.licenseId = "LicenseId already exists";

    setErrors(validationErrors);

    // If there are no validation errors, proceed with submission
    if (Object.keys(validationErrors).length === 0) {
      // Your submission logic here
      handleSubmitValidated();
    }
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };


  return (
    <div className="register-container" style={{ minHeight: "100vh" }}>
      <Paper elevation={10} style={paperStyle} className="register-container-paper">
        <div className="login-heading">
          {/* <div className="heading-avatar">
            <Avatar style={avatarStyle} src={avatar}></Avatar>
          </div> */}
          <div className="heading-txt">
            <h2>Register {role}</h2>
          </div>
        </div>

        <TextField
          id="standard-basic"
          name="name"
          style={textFieldStyle}
          label="Full name "
          variant="standard"
          onChange={handleInputChange}
          value={formData.name}
          error = {Boolean(errors.name)}
          helperText = {errors.name}
          fullWidth

        />
        <TextField
          id="standard-basic"
          label="Email"
          name="email"
          value={formData.email}
          type="email"
          variant="standard"
          fullWidth
          margin="normal"
          error={Boolean(errors.email)}
          helperText={errors.email}
          style={textFieldStyle}
          onChange={handleInputChange}
        />

        <TextField
          id="standard-basic"
          name="licenseId"
          value={formData.licenseId}
          style={textFieldStyle}
          label="License "
          variant="standard"
          fullWidth
          onChange={handleInputChange}
          error={Boolean(errors.licenseId)}
          helperText = {errors.licenseId}
        />
        <TextField
          id="standard-basic"
          name="phonenumber"
          type="number"
          value={formData.phonenumber}
          style={textFieldStyle}
          label="phone number "
          variant="standard"
          fullWidth
          onChange={handleInputChange}
          error={Boolean(errors.phonenumber)}
          helperText = {errors.phonenumber}
        />

        <Autocomplete
          options={districtOptions}
          style={textFieldStyle}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select District"
              variant="standard"
              fullWidth
              
            />
          )}
          onChange={(event, newValue) => handleDistrictChange(event, newValue)}
        />
        <div className="age-gender-container">
          <FormControl
            className="register-gender-select"
            error={Boolean(errors.gender)}
          >
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              variant="standard"
              onChange={handleGenderChange}
              value={formData.gender}
              error= {Boolean(errors.gender)}
            >
              <MenuItem value={"Men"}>Male</MenuItem>
              <MenuItem value={"Women"}>Female</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="standard-basic"
            name="age"
            value={formData.age}
           
            label="Age "
            variant="standard"
            type="number"
            className="register-age"
            onChange={handleInputChange}
            error={Boolean(errors.age)}
            helperText = {errors.age}
          />
        </div>
        <div className="register-submit-btn">
          <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
        </div>
      </Paper>
    </div>
  );
};

export default RegisterForm;
