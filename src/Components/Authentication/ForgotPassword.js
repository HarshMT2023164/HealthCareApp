import { Avatar, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useContext, useState } from "react";
import avatar from "../../utils/images/avatar.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupervisorContext from "../../utils/Context/SupervisorContext";
import { BASE_URL,forgotPassword } from "../../utils/constants/Urls";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [errorMessage , setErrorMessage] = useState(null);

  const handleSubmit = () => {
    console.log(formData);
    // Validate form fields before submitting
    const validationErrors = {};

    Object.keys(formData).forEach((fieldName) => {
      switch (fieldName) {
        case "email":
          if (!formData[fieldName] || !validateEmail(formData[fieldName])) {
            validationErrors[fieldName] = "Enter a valid email address";
          }
          break;
        default:
          break;
      }
    });

    setErrors(validationErrors);

    // If there are no validation errors, proceed with submission
    if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      handleNext();
    }
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleNext = async () => {

    console.log(formData);
  
      const res = await axios.post(        
         BASE_URL+forgotPassword,formData
         ).then((res) => {
           if(res){
                navigate('/resetPassword');
           }
           else{
             console.log('Email is not registered');
        }
          
        }).catch((err) => {
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.message
          ) {
            setErrorMessage(err.response.data.message);
          }
        });
  
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding field in the form data state
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    // Basic validation
    if (name === "email" && !value.trim()) {
      setErrors({
        ...errors,
        email: "Email is required",
      });
    } 
    else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const paperStyle = {
    padding: 20,
    width: 480,
    margin: "100px auto",
  };

  const textFieldStyle = {
    margin: "20px auto",
  };

  const avatarStyle = {
    height: 86,
    width: 86,
  };

  return (
    <div style={{minHeight : '100vh'}} className="login-container">
      <Paper elevation={10} style={paperStyle} className="login-container-paper">
        <div className="login-heading">
          <div className="heading-avatar">
            <Avatar style={avatarStyle} src={avatar}></Avatar>
          </div>
          <div className="heading-txt">
            <h2>Find your Account</h2>
          </div>
        </div>

        <TextField
          id="standard-basic"
          name="email"
          value={formData.email}
          onBlur={handleBlur}
          helperText={errors.email}
          error={Boolean(errors.email)}
          onChange={handleInputChange}
          style={textFieldStyle}
          label="Email"
          variant="standard"
          fullWidth
          type="email"
        />
        {/* <TextField
          id="standard-basic"
          name="password"
          value={user.password}
          onBlur={handleBlur}
          helperText={errors.password}
          error={Boolean(errors.password)}
          onChange={handleInputChange}
          style={textFieldStyle}
          label="Password"
          variant="standard"
          type="password"
          fullWidth
        /> */}
         {/* <div style={{ marginTop: '10px',textAlign:'center'}}>
            <a href="/forgot-password">Forgot Password? Click Here</a>
          </div> */}

          {/* <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              name="role"
             
              label="Select Role"
              value={user.role}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="FHW">FHW (Field Health Worker)</MenuItem>
            </Select>
          </FormControl> */}

        <div className="login-submit-btn">
          <Button variant="contained" onClick={() => {
            if((!errors.email)){
              return handleSubmit();
            }
          }}>
            Next
          </Button>
        </div>
        {errorMessage && (
            <div style={{ color: 'red', marginTop: '10px' , display: "flex" , justifyContent:"center"}}>
              {errorMessage}
            </div>
          )}
      </Paper>
    </div>
  );
};

export default ForgotPassword;
