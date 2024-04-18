import { Avatar, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useContext, useState } from "react";
import avatar from "../../utils/images/avatar.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupervisorContext from "../../utils/Context/SupervisorContext";
import { BASE_URL,resetPassword } from "../../utils/constants/Urls";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    token: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    token: "",
    password: "",
  });

  const [errorMessage , setErrorMessage] = useState(null);

  const handleResetPassword = async () => {
    const res = await axios.post(        
         BASE_URL+resetPassword,{
          token:formData.token,
          newPassword:formData.password
         }
         ).then((res) => {
           if(res){
            navigate('/');
           }
           else{
             console.log('Inavlid token or Password');
           }
          
         }).catch((err) => {
           setErrorMessage('Inavlid token or Password');
           console.log('Inavlid token or Password in catch');
         })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding field in the form data state
    setFormData({
      ...formData,
      [name]: value,
    });

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
      else{
        setErrors({
          ...errors,
          password: "",
        });
      }
    console.log(formData);
  };
}

  const handleBlur = (event) => {
    const { name, value } = event.target;
    // Basic validation
    if (name === "token" && !value.trim()) {
      setErrors({
        ...errors,
        token: "Token is required",
      });
    }
    else if (name === "password" && !value.trim()) {
      setErrors({
        ...errors,
        password: "Password is required",
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
            <h2>Change Password</h2>
          </div>
        </div>

        <TextField
          id="standard-basic"
          name="token"
          value={formData.token}
          onBlur={handleBlur}
          helperText={errors.token}
          error={Boolean(errors.token)}
          onChange={handleInputChange}
          style={textFieldStyle}
          label="Token"
          variant="standard"
          fullWidth
        />
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

        <div className="login-submit-btn">
          <Button variant="contained" onClick={() => {
            if((!errors.token  && !errors.password)){
             return handleResetPassword();
            }
          }}>
            Change Password
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

export default ResetPassword;
