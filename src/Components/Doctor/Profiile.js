// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Avatar, TextField } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import './ProfilePage.css'; // Import CSS file for styling

// const ProfilePage = () => {
//   // State variables for profile information
//   const tempData = {
//       name:"Tanvi Motwani",
//       age:23,
//       gender:"Female",
//       email:"tanvi@gmail.com",
//       phone:9827939337,
//       district:"Surat",
//   }
//   const [formData,setFormData] = useState(tempData);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const saveDetails = ()=>{
//     console.log(formData);
//   }
//   // const [name, setName] = useState('Tanvi Motwani');
//   // const [age, setAge] = useState('23');
//   // const [gender, setGender] = useState('Female');
//   // const [email, setEmail] = useState('tanvi@gmail.com');
//   // const [phone, setPhone] = useState('91823XXXXX');
//   // const [district, setDistrict] = useState('Surat');

//   // Function to handle saving profile details
//   // const saveDetails = () => {
//   //   // Logic to save details, you can send data to backend or store in local storage
//   //   console.log('Details saved:', { name, age, gender, email, phone, district });
//   // };


//   return (
//     <div className="profile-container">
//       <div className="profile-card card-1">
//         <div className="profile-picture">
//           {/* Profile icon */}
//           <Avatar sx={{ width: 150, height: 150, marginBottom: 2, marginLeft: '10%' }} alt="Profile Picture">
//             <AccountCircleIcon />
//           </Avatar>
//           {/* Name */}
//           <h2 className='name'>{formData.name}</h2>
//           {/* Upload picture button */}
//           <input className='file-input' type="file" accept="image/*" /> 
//         </div>
//       </div>
//       <div className="profile-card">
//         <h2>Profile</h2>
//         {/* Profile information fields */}
//         <div className="form-group">
//           <TextField className="form-input" name="name" label="name" variant="outlined" value={formData.name} onChange={handleInputChange} />
//           <TextField className="form-input" name="age" label="age" variant="outlined" value={formData.age} onChange={handleInputChange} sx={{ marginLeft: '1rem' }} />

//         </div>
//         <div className="form-group">
//           <TextField className="form-input" name="gender" label="gender" variant="outlined" value={formData.gender} onChange={handleInputChange} />
//           <TextField className="form-input" name="email" label="email" variant="outlined" type="email" value={formData.email} onChange={handleInputChange} sx={{ marginLeft: '1rem' }}/>
//         </div>
//         <div className="form-group">
//           <TextField className="form-input" name="phone" label="phone" variant="outlined" type="tel" value={formData.phone} onChange={handleInputChange} />
//           <TextField className="form-input" name="district" label="district" variant="outlined" value={formData.district} onChange={handleInputChange} sx={{ marginLeft: '1rem' ,backgroundColor:'lightgray',color:'black'}} InputProps={{
//     readOnly: true,shrink:true
//   }}/>
//         </div>
        
//         {/* Save details button */}
//         <button onClick={saveDetails} style={{ backgroundColor: '#007bff' }}>Save Details</button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Button, Input,InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Profile.css'; // Import CSS file for styling
import profImg from '../../utils/images/profile.jpeg';

const Profile = () => {
  // State variables for profile information
  const tempData = {
    name: "Harsh Ranpariya",
    age: 23,
    gender: "Male",
    email: "harsh@gmail.com",
    phone: 9927939344,
    district: "Surat",
  };
  const [formData, setFormData] = useState(tempData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveDetails = () => {
    console.log(formData);
  };

  return (
    <div className='profile-page'>
    <div className="profile-container">
      <div className="profile-card card-1">
        <div className="profile-picture">
            {/* Profile icon */}
            <Avatar src={profImg} sx={{ width: 150, height: 150, marginLeft: '1px' }} alt="Profile Picture">
              <AccountCircleIcon />
            </Avatar>
            {/* Name */}
            <h2 className='name'>{formData.name}</h2>
            <div className='file-input'>
            {/* Upload picture button */}
          
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
          <Input id="phone" className="form-input" name="phone" placeholder="Phone" type="tel" value={formData.phone} onChange={handleInputChange} />
          </div>
          <div>
          <InputLabel htmlFor="district">District</InputLabel>
          <Input id="district" className="form-input" name="district" placeholder="District" value={formData.district} onChange={handleInputChange} disabled />
          </div>
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

export default Profile;
