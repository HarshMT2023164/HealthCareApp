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

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserDetailsContext from "../../utils/Context/UserContext";
import {
  BASE_URL,
  addDoctor,
  addFHW,
  addSupervisor,
  addReceptionist,
  getAllDistricts,
  getUnallocatedDistricts,
  updateDoctor,
  updateFieldHealthCareWorker,
  updateSupervisor,
  updateReceptionist,
  getHospitalsByDistrict,
} from "../../utils/constants/URLS";
import { ROLES } from "../../utils/constants/Roles";

let RegisterForm = () => {
  const initialFormState = {
    name: "",
    email: "",
    licenseId: "",
    phoneNum: "",
    district: null, // Change this based on your district options structure
    gender: "",
    age: "",
    specialty: "",
    hospital:null,
    hospitalId:"",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const { role } = useParams();

  const { userDetails,setUserDetails } = useContext(UserDetailsContext);

  const token = localStorage.getItem("JwtToken");

   const [formType, setFormType] = useState("Register");

  const fetchDistricts = async () => {
    let apiUrl = getAllDistricts;
    if (role === "Supervisors") {
      apiUrl = getUnallocatedDistricts;
    }
    const response = await axios.get(BASE_URL + apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true"
      },
    });

    const mappedDistrictList = response.data.map((district) => ({
      id: district.id,
      name: district.name,
    }));
    // Handle the API response
    console.log(response.data);
    setDistrictOptions(mappedDistrictList);
  };

  const fetchHospitals = async (dist) => {
    const reqObj = {
      districtId:dist.id
    }

    const queryString = Object.keys(reqObj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
    .join('&');
    console.log(queryString);
    const response = await axios.get(BASE_URL + getHospitalsByDistrict+queryString, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true"
      },
    });

    const mappedHospitalsList = response.data.map((hospital) => ({
      id: hospital.id,
      name: hospital.name,
    }));
    // Handle the API response
    console.log(mappedHospitalsList);
    await setHospitalOptions(mappedHospitalsList);
    console.log(hospitalOptions);
  };

  useEffect(() => {
    if(!token){
      navigate("/");
      return;
    }
    if (userDetails) {
      console.log(userDetails);
      setFormData(userDetails);
      setFormType("Edit");
    }
    fetchDistricts();
  }, []);

  const handleSubmitValidated = async () => {
    let apiUrl;
    switch (role) {
      case ROLES.DOCTOR:
        apiUrl = addDoctor;
        break;
      case ROLES.SUPERVISOR:
        apiUrl = addSupervisor;
        break;
      case ROLES.FHW:
        apiUrl = addFHW;
        break;
      case ROLES.RECEPTIONIST:
        apiUrl = addReceptionist;
        break;
      default:
        apiUrl = addDoctor; // Default to getDoctors if role not specified or recognized
        break;
    }

    formData.age = parseInt(formData.age);

    formData.phoneNum = parseInt(formData.phoneNum);

    formData.hospitalId = parseInt(formData.hospitalId);
    console.log(formData);
    let res = await axios
      .post(BASE_URL + apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        },
      })
      .then((res) => {
        console.log(res);
        setUserDetails(null);
        if (res) {
          navigate("/admin/viewList/" + role);
          // navigate(`/bills/${res?.data?.student_id}`);
          // window.localStorage.setItem('student', JSON.stringify(res.data));
          // window.localStorage.setItem('IsAuthenticated', true);
        } else {
          console.log("Username or password incorrect in else of res");
        }
      })
      .catch((err) => {
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

  const handleEditFormSubmit = async () => {
    let apiUrl;
    switch (role) {
      case ROLES.DOCTOR:
        apiUrl = updateDoctor;
        break;
      case ROLES.SUPERVISOR:
        apiUrl = updateSupervisor;
        break;
      case ROLES.FHW:
        apiUrl = updateFieldHealthCareWorker;
        break;
      case ROLES.RECEPTIONIST:
        apiUrl = updateReceptionist;
        break;
      default:
        apiUrl = updateDoctor; // Default to getDoctors if role not specified or recognized
        break;
    }

    formData.age = parseInt(formData.age);

    formData.phoneNum = parseInt(formData.phoneNum);

    formData.hospitalId = parseInt(formData.hospitalId);

    let res = await axios
      .post(BASE_URL + apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        },
      })
      .then((res) => {
        console.log(res);
        setUserDetails(null);
        if (res) {
          navigate("/admin/viewList/" + role);
          // navigate(`/bills/${res?.data?.student_id}`);
          // window.localStorage.setItem('student', JSON.stringify(res.data));
          // window.localStorage.setItem('IsAuthenticated', true);
        } else {
          console.log("Username or password incorrect in res else");
        }
      })
      .catch((err) => {
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

  const paperStyle = {
    padding: 20,
    width: 600,
    margin: "100px auto",
  };

  const textFieldStyle = {
    margin: "10px auto",
  };

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
    phoneNum: "",
    district: "",
    gender: "",
    age: "",
    specialty: "",
  });

  const handleInputChange = (e) => {
    console.log(formData);
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
    fetchHospitals(newValue);
  };

  const handleHospitalChange = (event, newValue) => {
    console.log(newValue);
    setFormData((prevData) => ({
      ...prevData,
      hospital:newValue,
      hospitalId:newValue.id
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      hospital: "",
      hospitalId:"",
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
    console.log(formData);
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
          if (!formData[fieldName] && role === ROLES.DOCTOR) {
            validationErrors[fieldName] = "License is required";
          }
          else if (role === ROLES.DOCTOR && !/^MCI-IN-\d{6}$/.test(formData[fieldName])) {
            validationErrors[fieldName] = 'LicenseId must follow the format MCI-IN-XXXXXX' ;
          } 
          break;
        case "specialty":
          if (!formData[fieldName] && role === ROLES.DOCTOR) {
            validationErrors[fieldName] = "Specialty is required";
          }
          break;
        case "phoneNum":
          if (!formData[fieldName]) {
            validationErrors[fieldName] = "Phone number is required";
          }
          else if(formData[fieldName].length > 10){
            validationErrors[fieldName] = "Phone numbers cannot exceed 10 characters.";
          }
          break;
        case "district":
          if (!formData[fieldName]) {
            validationErrors[fieldName] = "District is required";
          }
          break;
        case "hospital":
          if (!formData[fieldName] && (role === ROLES.DOCTOR || role === ROLES.RECEPTIONIST)) {
            validationErrors[fieldName] = "Hospital is required";
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
    // setErrors(validationErrors);
    // validationErrors.email = "Email already exists";
    // validationErrors.licenseId = "LicenseId already exists";

    setErrors(validationErrors);

    // If there are no validation errors, proceed with submission
    if (Object.keys(validationErrors).length === 0) {
      // Your submission logic here
      if (userDetails) {
        handleEditFormSubmit();
      } else {
        handleSubmitValidated();
      }
    }
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  return (
    <div className="register-container" style={{ minHeight: "100vh" }}>
      <Paper
        elevation={10}
        style={paperStyle}
        className="register-container-paper"
      >
        <div className="login-heading">
          {/* <div className="heading-avatar">
            <Avatar style={avatarStyle} src={avatar}></Avatar>
          </div> */}
          <div className="heading-txt">
            <h2> {formType} {role}</h2>
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
          error={Boolean(errors.name)}
          helperText={errors.name}
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

        {role === ROLES.DOCTOR && (
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
            helperText={errors.licenseId}
          />
        )}

        {role === ROLES.DOCTOR && (
          <TextField
            id="standard-basic"
            name="specialty"
            value={formData.specialty}
            style={textFieldStyle}
            label="Specialty "
            variant="standard"
            fullWidth
            onChange={handleInputChange}
            error={Boolean(errors.specialty)}
            helperText={errors.specialty}
          />
        )}

        <TextField
          id="standard-basic"
          name="phoneNum"
          type="number"
          value={formData.phoneNum}
          style={textFieldStyle}
          label="phone number "
          variant="standard"
          fullWidth
          onChange={handleInputChange}
          error={Boolean(errors.phoneNum)}
          helperText={errors.phoneNum}
          InputProps={{ inputProps: { maxLength: 10 } }}
        />

        <Autocomplete
          value={formData.district}
          options={districtOptions}
          style={textFieldStyle}
          getOptionLabel={(option) => option.name}
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

        { role === ROLES.RECEPTIONIST && <Autocomplete
          value={formData.hospital}
          options={hospitalOptions?hospitalOptions:[]}
          style={textFieldStyle}
          getOptionLabel={(option) => option?option.name:''}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Hospital"
              variant="standard"
              fullWidth
            />
          )}
          onChange={(event, newValue) => handleHospitalChange(event, newValue)}
        />}


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
              error={Boolean(errors.gender)}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
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
            helperText={errors.age}
          />
        </div>
        <div className="register-submit-btn">
          <Button variant="contained" onClick={() => handleSubmit()}>
            Submit
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

export default RegisterForm;
