import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReceptionistContext from '../../utils/Context/ReceptionistContext';
import { ASSIGN_DOCTOR_TO_PATIENT, BASE_URL, GET_DOCTORS_LIST_BY_HOSPITAL, } from '../../utils/constants/URLS';



const  DoctorsList = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const doctor = location.state.doctor;

  const {searchDoctor} = useContext(ReceptionistContext);
 
  const handleAssign = (row) => {
    console.log(row);
    // localStorage.setItem("DoctorUsername" , row.usernname);
    const abhaId = localStorage.getItem("AbhaId");
    const reqObj = {
      abhaId:abhaId,
      doctorUsername:row.username,
    }
    assignDoctor(reqObj);
    navigate("/receptionist/home");
  }

  

  const columns = [
    { field: 'id', headerName: '#', flex: 1,headerClassName: 'header-highlight' },
    { field: 'name', headerName: 'Name', flex: 2 ,headerClassName: 'header-highlight'},
    { field: 'age', headerName: 'Age', flex: 1,headerClassName: 'header-highlight' },
    { field: 'gender', headerName: 'Gender', flex: 1 ,headerClassName: 'header-highlight'},
    { field: 'specialty', headerName: 'Speciality', flex: 2, headerClassName: 'header-highlight', },
    // { field: 'name', headerName: 'Name', flex: 2 },
    // // { field: 'district', headerName: 'District', flex: 1 },
    // { field: 'licenseId', headerName: 'LicenseID', flex: 2 },
    // { field: 'specialty', headerName: 'Speciality', flex: 2 },
    // { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'assign',
      headerName: 'Action',
      width: 150,
      headerClassName: 'header-highlight',
      
      renderCell: (params) => (
        <Button  variant="contained" style={{background : "#1976d2",width:80}} onClick={() => handleAssign(params.row)}>Assign</Button>
      ),
    },
];


const data=[];
// const data = [
//   { id: 1, name: "Rajesh Garg", email: "rajesh.garg_1991@gmail.com", contact: "8209170550" },
//   { id: 2, name: "Rajni Srivastava", email: "rajni.srivastava_1986@yahoo.com", contact: "9638124569" },
//   { id: 3, name: "Anil Singh", email: "anil.singh_1998@gmail.com", contact: "7890235550" },
//   { id: 4, name: "Neha Kumari", email: "neha.kumari_2001@gmail.com", contact: "6785412345" },
//   { id: 5, name: "Amit Sharma", email: "amit.sharma_2002@yahoo.com", contact: "9012345567" },
//   { id: 6, name: "Ram Kumar", email: "ram.kumar_1997@rediffmail.com", contact: "7786543210" },
//   { id: 7, name: "Ravi Verma", email: "ravi.verma_1996@gmail.com", contact: "8890345678" },
//   { id: 8, name: "Rahul Singh", email: "rahul.singh_1989@yahoo.com", contact: "9123456789" },
//   { id: 9, name: "Kiran Yadav", email: "kiran.yadav_1990@rediffmail.com", contact: "7654321987" },
//   { id: 10, name: "Rajan Patel", email: "rajan.patel_1992@gmail.com", contact: "8765432198" }
// ];



  const [dataList , setDataList] = useState(data);
  const [filteredDataList, setFilteredDataList] = useState([]);
  

  const filterData = () => {
    const filteredRows = dataList.filter(row =>
      row.name.toLowerCase().includes(searchDoctor.toLowerCase())
    );
    setFilteredDataList(filteredRows);
  };
  useEffect(() => {
    console.log(searchDoctor);
    filterData()
  }, [searchDoctor]);


  useEffect(() => {
    fetchListData();
},[])


const token  = localStorage.getItem("JwtToken");
const username = localStorage.getItem("username");

const assignDoctor = async (reqObj) => {

    try {

      console.log(token);   
      //to be continued
      const response = await axios.post(BASE_URL+ASSIGN_DOCTOR_TO_PATIENT,reqObj,{
      headers : {
            Authorization : `Bearer ${token}`,
          }}
      );
      // const response = await axios.get('http://192.168.0.104:8080/doctor/viewDoctors',{
      //   headers : {
      //     Authorization : `Bearer ${token}`,
      //   }
      // });
      // Handle the API response
      // data={
      //   id: response.data.id,
      //   name: response.data.name,
      //   age: response.data.age,
      //   gender: response.data.gender,
      //   email: response.data.email,
      //   contact
      // };
      // setDataList(response.data);
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.log(error)
      // console.error(error);
    }
  }

   const fetchListData = async () => {

    const reqObj = {
      username:username
    }

    const queryString = Object.keys(reqObj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
    .join('&');
    try {
      console.log(token);
      //to be continued
      const response = await axios.get(BASE_URL+GET_DOCTORS_LIST_BY_HOSPITAL+queryString,{
      headers : {
            Authorization : `Bearer ${token}`,
          }}
      );
      // const response = await axios.get('http://192.168.0.104:8080/doctor/viewDoctors',{
      //   headers : {
      //     Authorization : `Bearer ${token}`,
      //   }
      // });
      // Handle the API response
      // data={
      //   id: response.data.id,
      //   name: response.data.name,
      //   age: response.data.age,
      //   gender: response.data.gender,
      //   email: response.data.email,
      //   contact
      // };
      console.log(response.data);
      const updatedDoctorList = response.data.filter(doc=>(doc.name)!==doctor);
      setDataList(updatedDoctorList);
      setFilteredDataList(updatedDoctorList);
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
            // sx={{
            //   '& .simple-row': {
            //     backgroundColor: '#FAF9F6',
            //   },
            // }}
            // getRowClassName={(params) => (params.row.fhw === 'Not Assigned' ? '' : 'simple-row')}
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

export default DoctorsList;