import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Stack, Switch, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchContext from '../../utils/Context/SearchContext';
import UserDetailsContext from '../../utils/Context/UserContext';
import { BASE_URL,assignOnDeactivateSupervisor,getFreeSupervisors } from '../../utils/constants/URLS';
import { ROLES, Roles } from '../../utils/constants/Roles';

const AssignList = (props) => {
  const location = useLocation();
  const oldUsername = location.state.oldUsername;  
  const id = location.state.id;
  const { role } = useParams();
  const navigate = useNavigate();
  const { searchText } = useContext(SearchContext);
  const [dataList, setDataList] = useState([]);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [loading, setLoading] = useState(true); // State for managing loading status

  useEffect(() => {
    fetchData();
  }, [role]); // Include searchText in dependency array


  useEffect(() => {
    filterData()
  }, [searchText]);

  const filterData = () => {
    const filteredRows = dataList.filter(row =>
      row.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDataList(filteredRows);
  };

  const handleAssign = async(row) => {
    const token = localStorage.getItem("JwtToken");
    try{
        const reqObject ={
            oldUsername : oldUsername,
            newUsername : row.username,
            districtId : id,
        }
      const response = await axios.post(BASE_URL + assignOnDeactivateSupervisor, reqObject,{
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        },
      });
      console.log(response.data);
    console.log("Deactivated!");
    navigate("/admin/viewList/"+role);
    }
    catch(error)
    {
      console.log(error);
    }
  }

  const fetchData = async() => {
    const token = localStorage.getItem("JwtToken");
    try{
      const response = await axios.get(BASE_URL + getFreeSupervisors ,{
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        },
      });
      console.log(response.data);
      setLoading(false); 
      setDataList(response.data);
      setFilteredDataList(response.data);
    }
    catch(error)
    {
      console.log(error);
    }
  }

  // Define columns array based on role
  let columns = [
    { field: 'id', headerName: '#', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'district', headerName: 'District', flex: 2, valueGetter: (params) => params.row.district?params.row.district.name:"" },
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'phoneNum', headerName: 'Phone Number', flex: 2 }
  ];

  const assignColumn = {
    field: 'assign',
    headerName: 'Action',
    width: 110,
    renderCell: (params) => (
      <Button variant="contained" color="primary" onClick={() => handleAssign(params.row)}>Assign</Button>
    ),
  }

  // Add LicenseID and Speciality fields if the role is Doctor
  if(role === ROLES.SUPERVISOR)
  {
    columns.splice(4,1);
    columns.push(assignColumn)
  }
  if (role === ROLES.DOCTOR) {
    columns = [
      ...columns,
      { field: 'licenseId', headerName: 'LicenseID', flex: 2 },
      { field: 'specialty', headerName: 'Speciality', flex: 2 },
    ];
  }

 
  
//   const data = [
//       { id: 1, name:'DEF',age:24, gender:'Female',district:'ABC' },
//   ]
  return (
    <div className='list-table-grid'>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress size={100} /> 
        </div>
      ) : (
        <DataGrid
          rows={filteredDataList.map((item, id) => ({ ...item, id: id + 1 }))}
          columns={columns}
          autoHeight
        />
       )} 
    </div>
  );
};

export default AssignList;
