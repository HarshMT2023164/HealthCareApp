import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, TextField } from '@mui/material';
import React, { useState } from 'react';
import './ProfilePage.css'; // Import CSS file for styling

const ProfilePage = () => {
  // State variables for profile information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  // Function to handle saving profile details
  const saveDetails = () => {
    // Logic to save details, you can send data to backend or store in local storage
    console.log('Details saved:', { firstName, lastName, email, phoneNumber, state, city });
  };

  return (
    <div className="profile-container">
      <div className="profile-card card-1">
        <div className="profile-picture">
          {/* Profile icon */}
          <Avatar sx={{ width: 150, height: 150, marginBottom: 2, marginLeft: '10%' }} alt="Profile Picture">
            <AccountCircleIcon />
          </Avatar>
          {/* Name */}
          <h2 className='name'>{`${firstName} ${lastName}`}</h2>
          {/* Upload picture button */}
          <input type="file" accept="image/*" /> 
        </div>
      </div>
      <div className="profile-card">
        <h2>Profile</h2>
        <p>The information can be edited</p>
        {/* Profile information fields */}
        <div className="form-group">
          <TextField label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <TextField label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ marginLeft: '1rem' }} />
        </div>
        <div className="form-group">
          <TextField label="Email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Phone Number" variant="outlined" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} sx={{ marginLeft: '1rem' }}/>
        </div>
        <div className="form-group">
          <TextField label="State" variant="outlined" value={state} onChange={(e) => setState(e.target.value)} />
          <TextField label="City" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} sx={{ marginLeft: '1rem' }}/>
        </div>
        {/* Save details button */}
        <button onClick={saveDetails} style={{ backgroundColor: '#007bff' }}>Save Details</button>
      </div>
    </div>
  );
};

export default ProfilePage;
