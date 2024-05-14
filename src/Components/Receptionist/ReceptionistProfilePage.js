import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Button, Input,InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'; // Import CSS file for styling
import axios from 'axios';
import { BASE_URL, GET_RECEPTIONIST, SET_RECEPTIONIST, } from '../../utils/constants/URLS';

const ReceptionistProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("JwtToken");
  useEffect(() => {
      if(!token){
          navigate("/");
          return;
      }
  })


  // State variables for profile information

  const [nameHeading,setNameHeading] = useState('');
  const username = localStorage.getItem("username");
  const [formData, setFormData] = useState({
    name:'',
    age:'',
    gender:'',
    email:'',
    phoneNumber:'',
    district:{
      id:'',
      name:''
    }
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const reqObj = {
    username:username,
  }
  
  const getDetails = async() => {
    try {
      console.log(token);
      const queryString = Object.keys(reqObj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
    .join('&');
      const response = await axios.get(BASE_URL+GET_RECEPTIONIST+queryString,{
        headers : {
              Authorization : `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true"
            }
      });
      // const response = await axios.get('http://192.168.0.104:8080/doctor/viewDoctors',{
      //   headers : {
      //     Authorization : `Bearer ${token}`,
      //   }
      // });
  
      // Handle the API response
      console.log(response.data);
      const data = {
        name:response.data.name,
        age:response.data.age,
        gender:response.data.gender,
        email:response.data.email,
        phoneNumber:response.data.phoneNumber,
      }
      setNameHeading(response.data.name);
      setFormData(data);
  
    } catch (error) {
      // Handle errors
      console.log(error)
      // console.error(error);
    }
  }


  const saveDetails = async() => {
    try {
      console.log(token);
      const reqObj = {
        username:username,
        name:formData.name,
        age:formData.age,
        email:formData.email,
        phoneNumber:formData.phoneNumber,
      }
      const response = await axios.post(BASE_URL+SET_RECEPTIONIST,reqObj,{
        headers : {
              Authorization : `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true"
            }
      });
      // const response = await axios.get('http://192.168.0.104:8080/doctor/viewDoctors',{
      //   headers : {
      //     Authorization : `Bearer ${token}`,
      //   }
      // });
  
      // Handle the API response
      console.log(response.data);
      getDetails();
  
    } catch (error) {
      // Handle errors
      console.log(error)
      // console.error(error);
    }
  };

  useEffect(()=>{
    getDetails();
  },[]);

  useEffect(()=>{
    
  },[nameHeading]);


  return (
    <div className='profile-page'>
    <div className="profile-container">
      <div className="profile-card card-1">
        <div className="profile-picture">
            {/* Profile icon */}
            <Avatar sx={{ width: 150, height: 150, marginLeft: '1px' }} alt="Profile Picture">
              <AccountCircleIcon />
            </Avatar>
            {/* Name */}
            <h2 className='name'>{nameHeading}</h2>
            <div className='file-input'>
            {/* Upload picture button */}
            <input  type="file" accept="image/*" />
            </div>
        </div>
      </div>
      <div className="profile-card">
        <h2>Profile</h2>
        {/* Profile information fields */}
        <div className="form-group">
          <div>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" className="form-input" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div>
          <InputLabel htmlFor="age">Age</InputLabel>
          <Input id="age" className="form-input" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
          </div>
         </div>
        <div className="form-group">
          <div>
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Input id="gender" className="form-input" name="gender" placeholder="Gender" value={formData.gender} onChange={handleInputChange} />
          </div>
          <div>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" className="form-input" name="email" placeholder="Email" type="email" value={formData.email} onChange={handleInputChange} />
          </div>
           </div>
        <div className="form-group">
          <div>
          <InputLabel htmlFor="phone">Phone</InputLabel>
          <Input id="phone" className="form-input" name="phoneNumber" placeholder="Phone" type="tel" value={formData.phoneNumber} onChange={handleInputChange} />
          </div>
          {/* <div>
          <InputLabel htmlFor="district">District</InputLabel>
          <Input id="district" className="form-input" name="district" placeholder="District" value={formData.district.name} onChange={handleInputChange} disabled />
          </div> */}
        </div>
        <div className='button'>
        {/* Save details button */}
        <Button  variant="contained" onClick={saveDetails}>Save Details</Button>
        {/* <button onClick={saveDetails} style={{ backgroundColor: '#007bff' }}>Save Details</button> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ReceptionistProfilePage;
