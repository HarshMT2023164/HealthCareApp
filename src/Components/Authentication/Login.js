import {
  Avatar,
  Button,
  Paper,
  TextField
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../utils/images/avatar.jpeg";
import {BASE_URL,signIn} from '../../utils/constants/Urls'

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleForgotPassword = async() => {
    navigate("/forgotPassword");
  }

  const validateSubmit = () => {
    console.log(user);
    // Validate form fields before submitting
    const validationErrors = {};

    Object.keys(user).forEach((fieldName) => {
      switch (fieldName) {
        case "username":
          if (!user[fieldName]) {
            validationErrors[fieldName] = "Username is required";
          }
          break;
        case "password":
          if (!user[fieldName]) {
            validationErrors[fieldName] = "Password is required";
          }
          break;

        default:
          break;
      }
    });

    // Set validation errors in state
    // setErrors(validationErrors);
    // validationErrors.email = "Email already exists";
    // validationErrors.licenseId = "LicenseId already exists";

    setErrors(validationErrors);

    // If there are no validation errors, proceed with submission
    if (Object.keys(validationErrors).length === 0) {
      // Your submission logic here
      authenticate();
    }
  };

  const authenticate = async () => {
    // navigate(`/roles`);

    // console.log(user);
    // try {
    //   const response = await fetch("http://172.16.142.169:8080/auth/signin", {
    //     method: 'POST',
    //     body: user
    //   });

    //   if (!response.ok) {
    //     throw new Error('Login failed');
    //   }

    //   // Assuming the server returns a JSON object with a token
    //   const data = await response.json();

    //   // Do something with the data (e.g., store the token in state or localStorage)
    //   console.log('Login successful', data);
    //   navigate(`/roles`);
    // } catch (error) {
    //   console.error('Error during login:', error.message);
    // }

    let res = await axios
      .post(BASE_URL+signIn, user)
      .then((res) => {
        console.log(res.data.jwtResponse.accessToken);
        localStorage.setItem("JwtToken", res.data.jwtResponse.accessToken);
        // localStorage.setItem("JwtResponse" , JSON.stringify(res.data.jwtResponse));
        // localStorage.setItem('RoleCount', JSON.stringify(res.data.counts));

        if (res) {
          if(res.data.jwtResponse.logInFirst==true)
          {
            navigate('/setPassword');
          }
          else{
            if(res.data.jwtResponse.roles[0]==="ROLE_ADMIN")
            {
              navigate("/admin/roles");
            }
            else if(res.data.jwtResponse.roles[0]==="supervisor")
            {
              localStorage.setItem("username",res.data.jwtResponse.username);
              localStorage.setItem("district",res.data.userRole.district.name);
              navigate("/supervisor/home");
            }
            else{
              //doctor code
            }  
          }
          // window.localStorage.setItem('student', JSON.stringify(res.data));
          // window.localStorage.setItem('IsAuthenticated', true);
        } else {
          console.log("Username or password incorrect");
        }
      })
      .catch((err) => {
        setErrorMessage("Username or password is incorrect");
        console.log("Username or password incorrect in catch");
      });

    // const response = await fetch('http://172.16.142.16:8080/api/auth/signin', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: user,
    //   });

    //   console.log(response);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding field in the form data state
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    // Basic validation
    if (name === "username" && !value.trim()) {
      setErrors({
        ...errors,
        username: "Username is required",
      });
    } else if (name === "password" && value.length < 6) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters",
      });
    } else {
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
    <div style={{ minHeight: "100vh" }} className="login-container">
      <Paper
        elevation={10}
        style={paperStyle}
        className="login-container-paper"
      >
        <div className="login-heading">
          <div className="heading-avatar">
            <Avatar style={avatarStyle} src={avatar}></Avatar>
          </div>
          <div className="heading-txt">
            <h2>Login</h2>
          </div>
        </div>

        <TextField
          id="standard-basic"
          name="username"
          value={user.username}
          onBlur={handleBlur}
          helperText={errors.username}
          error={Boolean(errors.username)}
          onChange={handleInputChange}
          style={textFieldStyle}
          label="Username"
          variant="standard"
          fullWidth
        />
        <TextField
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
        />
         <div style={{ marginTop: '10px',textAlign:'center'}}>
            <a href="/forgotPassword" onClick={handleForgotPassword}>Forgot Password? Click Here</a>
          </div>

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
          <Button variant="contained" onClick={() => validateSubmit()}>
            Log in
          </Button>
        </div>
        {errorMessage && (
          <div
            style={{
              color: "red",
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {errorMessage}
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Login;
