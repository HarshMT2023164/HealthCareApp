import { Avatar, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useContext, useState } from "react";
import avatar from "../../utils/images/avatar.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupervisorContext from "../../utils/Context/SupervisorContext";
import { BASE_URL,changePassword } from "../../utils/constants/URLS";

const SetPassword = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errorMessage , setErrorMessage] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(false);


  const handleChangePassword = async () => {
    console.log(username);
    console.log(formData.password);
     const res = await axios.post(        
         BASE_URL+changePassword,{
           token:username,
           newPassword:formData.password
         }
         ).then((res) => {
           if(res){
            navigate('/')
          }
          else{
             console.log('Password is Incorrect');
           }
          
         }).catch((err) => {
           setErrorMessage("Password is Incorrect");
           console.log('Password incorrect in catch');
         })
  
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding field in the form data state
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
    if (name === "password") {
      if (!value) {
        setErrors({
          ...errors,
          password: "Password is required!",
        });
      } else if (value.length < 6) {
        setErrors({
          ...errors,
          password: "Password must be at least 6 characters long",
        });
      } else if (!/[A-Z]/.test(value)) {
        setErrors({
          ...errors,
          password: "Password must contain at least one uppercase letter",
        });
      } else if (!/[a-z]/.test(value)) {
        setErrors({
          ...errors,
          password: "Password must contain at least one lowercase letter",
        });
      } else if (!/\d/.test(value)) {
        setErrors({
          ...errors,
          password: "Password must contain at least one digit",
        });
      } else if (!/[@#$%^&*!]/.test(value)) {
        setErrors({
          ...errors,
          password: "Password must contain at least one special character",
        });
      }
      else
      {
        setErrors({
          ...errors,
          password: "",
        });
      }
    console.log(formData);
  };
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors({
          ...errors,
          confirmPassword: 'Passwords do not match',
        });
        setPasswordsMatch(false);
      } else {
        setErrors({
          ...errors,
          confirmPassword: '',
        });
        setPasswordsMatch(true);
      }
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    // Basic validation
    if (name === "password" && !value.trim()) {
      setErrors({
        ...errors,
        password: "Password is required",
      });
    } else if (name === "password" && !value.trim()) {
      setErrors({
        ...errors,
        password: "Password is required",
      });
    } 
    else if (name === "confirmPassword" && !value.trim()) {
      setErrors({
        ...errors,
        confirmPassword: "Confirm Password is required",
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
            <h2>Set Password</h2>
          </div>
        </div>

        <TextField
          id="standard-basic"
          name="password"
          value={formData.password}
          onBlur={handleBlur}
          helperText={errors.password}
          error={Boolean(errors.password)}
          onChange={handleInputChange}
          style={textFieldStyle}
          label="Password"
          variant="standard"
          type="password"
          fullWidth
        />
        <TextField
          id="standard-basic"
          name="confirmPassword"
          value={formData.confirmPassword}
          onBlur={handleBlur}
          helperText={errors.confirmPassword}
          error={Boolean(errors.confirmPassword)}
          onChange={handleInputChange}
          style={textFieldStyle}
          label="Confirm Password"
          variant="standard"
          type="password"
          fullWidth
        />
         {/* <div style={{ marginTop: '10px',textAlign:'center'}}>
            <a href="/forgotPassword">Forgot Password? Click Here</a>
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

         {passwordsMatch && (
          <div style={{ color: 'green', marginTop: '10px' , display: "flex" , justifyContent:"center"}}>
            Passwords match
          </div>
        )}
        <div className="login-submit-btn">
          <Button variant="contained" onClick={() => {
            if((!errors.password  && !errors.confirmPassword) && passwordsMatch){
              return handleChangePassword();
            }
          }}>
            Submit
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

export default SetPassword;
