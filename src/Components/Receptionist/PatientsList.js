import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReceptionistContext from '../../utils/Context/ReceptionistContext';
import { BASE_URL, GET_PATIENT_LIST_BY_HOSPITAL, } from '../../utils/constants/URLS';
import './Receptionist.css';


const PatientsList = (props) => {

  const navigate = useNavigate();

  const data = [];
 
  const {searchPatient} = useContext(ReceptionistContext);
  // const {supervisor,setSupervisor} = useContext(SupervisorContext);


  const handleView = (rowData) => {
    localStorage.setItem("AbhaId",rowData.abhaId);
    let doctor = "";
    if(rowData.doctor==null)
    {
      doctor = "";
    }
    else
    {
      doctor = rowData.doctor.name;
    }
    navigate("/receptionist/doctors",{state:{doctor:doctor}});
  }

  const columns = [
    { field: 'id', headerName: '#', flex: 1, headerClassName: 'header-highlight' },
    { field: 'abhaId', headerName: 'ABHA Id', flex: 1, headerClassName: 'header-highlight' },
    { field: 'name', headerName: 'Patient Name', flex: 1, headerClassName: 'header-highlight' },
    { field: 'gender', headerName: 'Gender', flex: 1, headerClassName: 'header-highlight' },
    { field: 'age', headerName: 'Patient Age', flex: 1, headerClassName: 'header-highlight' },
    { field: 'doctor', headerName: 'Doctor Assigned', flex: 1, headerClassName: 'header-highlight' ,valueGetter: (params) => params.row.doctor==null?"Not Assigned":params.row.doctor.name},
    // { field: 'name', headerName: 'Name', flex: 2 },
    // { field: 'age', headerName: 'Age', flex: 1 },
    // { field: 'gender', headerName: 'Gender', flex: 1 },
    // // { field: 'district', headerName: 'District', flex: 1 },
    // { field: 'licenseId', headerName: 'LicenseID', flex: 2 },
    // { field: 'specialty', headerName: 'Speciality', flex: 2 },
    // { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'view',
      headerName: 'Action',
      width: 150,
      headerClassName: 'header-highlight',
      renderCell: (params) => (
        <Button  variant="contained" style={{background : "#1976d2",width:80}} onClick={() => handleView(params.row)}>
      {params.row.doctor==null ? 'Assign' : 'Edit'}
    </Button>
      ),
      flex:1,
    },
];


  
  // const data = [
  //   { id: 1, area: 'Adajan', fhw: 'John Doe', pincode: '395009' },
  //   { id: 2, area: 'Athwa', fhw: 'Jane Smith', pincode: '395007' },
  //   { id: 3, area: 'Piplod', fhw: 'Not Assigned', pincode: '395007' },
  //   { id: 4, area: 'Varachha', fhw: 'Emily Brown', pincode: '395006' },
  //   { id: 5, area: 'Katargam', fhw: 'David Wilson', pincode: '395004' },
  //   { id: 6, area: 'Rander', fhw: 'Not Assigned', pincode: '395005' },
  //   { id: 7, area: 'Udhna', fhw: 'Christopher Lee', pincode: '394210' },
  //   { id: 8, area: 'Pal', fhw: 'Not Assigned', pincode: '394210' },
  //   { id: 9, area: 'Sarthana', fhw: 'Matthew Garcia', pincode: '395006' },
  //   { id: 10, area: 'Katargam', fhw: 'Not Assigned', pincode: '395004' },
  // ];

  const [dataList , setDataList] = useState([]);
  const [filteredDataList, setFilteredDataList] = useState([]);


  const filterData = () => {
    const filteredRows = dataList.filter(row =>
      row.abhaId.toLowerCase().includes(searchPatient.toLowerCase())
    );
    setFilteredDataList(filteredRows);
  };
  useEffect(() => {
    filterData()
  }, [searchPatient]);


  useEffect(() => {
    fetchListData();
},[])


const token  = localStorage.getItem("JwtToken");
const username = localStorage.getItem("username");

const reqObj = {
  username:username
}
const queryString = Object.keys(reqObj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
    .join('&');

const fetchListData = async () => {


    try {
      // console.log(token);
      const response = await axios.get(BASE_URL+GET_PATIENT_LIST_BY_HOSPITAL+queryString,{
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
      let count = 1;
      const data = response.data.map((obj)=>(
        {
          ...obj,
          id:count++,
        }
      ))
      console.log(data);
      await setDataList(data);
      await setFilteredDataList(data);

    } catch (error) {
      // Handle errors
      console.log(error)
      // console.error(error);
    }

   

}

    return (
        <div className='list-table-grid'>
          <DataGrid
            rows={filteredDataList.map((item, index) => ({ ...item, index: index + 1 }))}
            columns={columns}
            sx={{
              '& .simple-row': {
                backgroundColor: '#FAF9F6',
              },
            }}
            getRowClassName={(params) => (params.row.doctor === 'Not Assigned' ? '' : 'simple-row')}
            // initialState={{
            //   pagination: false,
            // }}
            // pageSizeOptions={[5, 10]}
            autoHeight
            // autoPageSize
          />
        </div>
      );
}

export default PatientsList;