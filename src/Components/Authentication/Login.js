import { Avatar, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useState } from "react";
import avatar from "../../utils/images/avatar.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const [errorMessage , setErrorMessage] = useState(null);

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


    let res = await axios.post(        
        "auth/signin",user
        ).then((res) => {
          console.log(res.data.jwtResponse.accessToken);
          localStorage.setItem("JwtToken" , res.data.jwtResponse.accessToken);
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
          setErrorMessage("Username or password is incorrect");
          console.log('Username or password incorrect in catch');
        })


    // const response = await fetch('http://172.16.142.16:8080/api/auth/signin', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: user,
    //   });

    //   console.log(response);
    navigate("/roles");
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
    <div style={{minHeight : '100vh'}} className="login-container">
      <Paper elevation={10} style={paperStyle} className="login-container-paper">
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

          <FormControl fullWidth margin="normal">
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
          </FormControl>

        <div className="login-submit-btn">
          <Button variant="contained" onClick={() => {
            if((!errors.username  && !errors.password)){
              return authenticate();
            }
          }}>
            Log in
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

export default Login;
