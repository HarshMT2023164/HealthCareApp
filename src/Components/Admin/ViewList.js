import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Stack, Switch, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchContext from '../../utils/Context/SearchContext';
import UserDetailsContext from '../../utils/Context/UserContext';
import { BASE_URL, getCitizenList, getDoctor, getFHW, getSupervisors,activate,deactivate } from '../../utils/constants/URLS';
import { ROLES, Roles } from '../../utils/constants/Roles';

const ViewList = (props) => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { setUserDetails } = useContext(UserDetailsContext);
  const { searchText } = useContext(SearchContext);
  const [dataList, setDataList] = useState([]);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [loading, setLoading] = useState(true); // State for managing loading status

  useEffect(() => {
    fetchListData();
  }, [role]); // Include searchText in dependency array


  useEffect(() => {
    filterData()
  }, [searchText]);

  const handleStatusChange = async(row) =>{
    if(role === ROLES.SUPERVISOR)
    {
        if(row.active === true)
          {
            const reqObject = {
              username: row.username
            }
            const username = row.username;
            const id = row.district.id;
            const token = localStorage.getItem("JwtToken");
            try{
              const response = await axios.put(BASE_URL + deactivate, reqObject,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(response.data);
              console.log("Deactivated Supervisor!");
              navigate("/admin/assignList/"+role,{state:{oldUsername:username,id:id}});
            }
            catch(error)
            {
              console.log(error);
            }
          }
        else
        {
          const reqObject = {
            username: row.username
          }
            const token = localStorage.getItem("JwtToken");
            try{
              const response = await axios.put(BASE_URL + activate, reqObject,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(response.data);
              console.log("Activated Supervisor!");
              fetchListData();
            }
            catch(error)
            {
              console.log(error);
            }
        }
    }
    if(role === ROLES.DOCTOR)
    {
      
        if(row.active === true)
          {
            const reqObject = {
              username: row.username
            }
            const token = localStorage.getItem("JwtToken");
            try{
              const response = await axios.put(BASE_URL + deactivate, reqObject,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(response.data);
              console.log("Deactivated Doctor!");
             fetchListData();
            }
            catch(error)
            {
              console.log(error);
            }
          }
        else
        {
          const reqObject = {
            username: row.username
          }
            const token = localStorage.getItem("JwtToken");
            try{
              const response = await axios.put(BASE_URL + activate,reqObject,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(response.data);
              console.log("Activated Doctor!");
              fetchListData();
            }
            catch(error)
            {
              console.log(error);
            }
        }
    }
  }

  const filterData = () => {
    const filteredRows = dataList.filter(row =>
      row.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDataList(filteredRows);
  };


  const fetchListData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      let apiUrl;
      switch (role) {
        case ROLES.DOCTOR:
          apiUrl = getDoctor;
          break;
        case ROLES.SUPERVISOR:
          apiUrl = getSupervisors;
          break;
        case ROLES.FHW:
          apiUrl = getFHW;
          break;
        case ROLES.CITIZEN:
          apiUrl = getCitizenList;
          break;
        default:
          apiUrl = getDoctor;
          break;
      }

      const token = localStorage.getItem("JwtToken");
      const response = await axios.get(BASE_URL + apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setDataList(response.data);
      setFilteredDataList(response.data);
      console.log(filteredDataList);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log(error);
      setLoading(true); // Set loading to false if there's an error
    }
  };

  const handleEdit = (data) => {
    setUserDetails(data);
    navigate("/admin/register/" + role);
  };

  // Define columns array based on role
  let columns = [
    { field: 'id', headerName: '#', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'district', headerName: 'District', flex: 2, valueGetter: (params) => params.row.district?params.row.district.name:""},
  ];

  // Add LicenseID and Speciality fields if the role is Doctor
  if (role !== ROLES.CITIZEN) {
    columns.splice(4, 0,
      { field: 'email', headerName: 'Email', flex: 2 },
      { field: 'phoneNum', headerName: 'Phone Number', flex: 2 }
    );
  }

  if (role === ROLES.DOCTOR) {
    columns = [
      ...columns,
      { field: 'licenseId', headerName: 'LicenseID', flex: 2 },
      { field: 'specialty', headerName: 'Speciality', flex: 2 },
    ];
  }

  if (role === ROLES.CITIZEN) {
    columns = [
      ...columns,
      { field: 'pincode', headerName: 'PinCode', flex: 2 },
      { field: 'address', headerName: 'Address', flex: 2 },
      { field: 'abhaId', headerName: 'ABHAId', flex: 2 }
    ];
  }

  const actionColumn = {
    field: 'edit',
    headerName: 'Action',
    width: 110,
    renderCell: (params) => (
      <Button variant="contained" color="primary" onClick={() => handleEdit(params.row)}>Edit</Button>
    ),
  };

  const statusColumn = {
    field: 'status',
    headerName: 'Action',
    flex:1,
    renderCell: (params) => (
      // <Button variant="contained" color="primary" onClick={() => handleEdit(params.row)}>Edit</Button>
        <Switch checked={params.row.active} size='medium' onChange={() => handleStatusChange(params.row)}/>
    ),
  };


  if (role !== ROLES.CITIZEN) {
    columns.push(actionColumn);
    columns.push(statusColumn);
  }

  // const data = [
  //     { id: 1, name:'ABC',age:24, gender:'Female',district:'ABC' },
  // ]
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

export default ViewList;
