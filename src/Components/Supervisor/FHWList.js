import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupervisorContext from '../../utils/Context/SupervisorContext';
import { BASE_URL,getUnassignedFHW,getByUsername,assignWorkerToLocalArea } from '../../utils/constants/Urls';



const  FHWList = () => {

  const navigate = useNavigate();

  const {searchFHW,setSearchFHW} = useContext(SupervisorContext);
  // const {supervisor,setSupervisor} = useContext(SupervisorContext);
 
  const handleAssign = (row) => {
    localStorage.setItem("FHWUsername" , row.usernname);
    const localAreaId = localStorage.getItem("localAreaId");
    const reqObj = {
      localAreaId:localAreaId,
      username:row.username,
    }
    assignFHW(reqObj);
    navigate("/supervisor/home");
    // navigate("/supervisor/AreaPatientlist");
  }

  

  const columns = [
    { field: 'index', headerName: '#', flex:1},
    { field: 'name' , headerName: 'Name', flex:1},
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'email', headerName: 'Email',flex:2},
    { field: 'phoneNum', headerName: 'Contact', flex:1},
    {field:'username', headerName:'UserName',flex:1,hide:true},

    // { field: 'name', headerName: 'Name', flex: 2 },
    // // { field: 'district', headerName: 'District', flex: 1 },
    // { field: 'licenseId', headerName: 'LicenseID', flex: 2 },
    // { field: 'specialty', headerName: 'Speciality', flex: 2 },
    // { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'assign',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button  variant="contained" color="primary" onClick={() => handleAssign(params.row)}>Assign</Button>
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
      row.name.toLowerCase().includes(searchFHW.toLowerCase())
    );
    setFilteredDataList(filteredRows);
  };
  useEffect(() => {
    console.log(searchFHW);
    filterData()
  }, [searchFHW]);


  useEffect(() => {
    fetchListData();
},[])


const token  = localStorage.getItem("JwtToken");
const username = localStorage.getItem("username");

const assignFHW = async (reqObj) => {

    try {
      console.log(token);   
      //to be continued
      const response = await axios.post(BASE_URL+assignWorkerToLocalArea,reqObj,{
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
      const response = await axios.get(BASE_URL+getUnassignedFHW+queryString,{
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
      setDataList(response.data);
      setFilteredDataList(response.data);
      console.log(response.data);
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

export default FHWList;