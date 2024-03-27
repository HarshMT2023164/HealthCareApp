import { DataGrid,useGridApiContext } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import SearchContext from '../../utils/Context/SearchContext';
import { Button } from '@mui/material';
import UserDetailsContext from '../../utils/Context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import SupervisorContext from '../../utils/Context/SupervisorContext';
import React from 'react';




const  FHWList = () => {

  const navigate = useNavigate();

  const {searchFHW} = useContext(SupervisorContext);
 
  const handleAssign = (data) => {
    console.log(data);
    navigate("/supervisor/AreaPatientlist");
  }

  

  const columns = [
    { field: 'index', headerName: '#', flex:1},
    {field: 'name' , headerName: 'Name', flex:1},
    {field: 'email', headerName: 'Email',flex:2},
    {field: 'contact', headerName: 'Contact', flex:1},
    // { field: 'name', headerName: 'Name', flex: 2 },
    // { field: 'age', headerName: 'Age', flex: 1 },
    // { field: 'gender', headerName: 'Gender', flex: 1 },
    // // { field: 'district', headerName: 'District', flex: 1 },
    // { field: 'licenseId', headerName: 'LicenseID', flex: 2 },
    // { field: 'specialty', headerName: 'Speciality', flex: 2 },
    // { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'assign',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleAssign(params.row)}>Assign</Button>
      ),
    },
];


  
const data = [
  { id: 1, name: "Rajesh Garg", email: "rajesh.garg_1991@gmail.com", contact: "8209170550" },
  { id: 2, name: "Rajni Srivastava", email: "rajni.srivastava_1986@yahoo.com", contact: "9638124569" },
  { id: 3, name: "Anil Singh", email: "anil.singh_1998@gmail.com", contact: "7890235550" },
  { id: 4, name: "Neha Kumari", email: "neha.kumari_2001@gmail.com", contact: "6785412345" },
  { id: 5, name: "Amit Sharma", email: "amit.sharma_2002@yahoo.com", contact: "9012345567" },
  { id: 6, name: "Ram Kumar", email: "ram.kumar_1997@rediffmail.com", contact: "7786543210" },
  { id: 7, name: "Ravi Verma", email: "ravi.verma_1996@gmail.com", contact: "8890345678" },
  { id: 8, name: "Rahul Singh", email: "rahul.singh_1989@yahoo.com", contact: "9123456789" },
  { id: 9, name: "Kiran Yadav", email: "kiran.yadav_1990@rediffmail.com", contact: "7654321987" },
  { id: 10, name: "Rajan Patel", email: "rajan.patel_1992@gmail.com", contact: "8765432198" }
];



  const [dataList , setDataList] = useState(data);

  const dataListWithIndex = dataList.map((item, index) => ({ ...item, index: index + 1 }));
  

  const filterData = () => {
    const filteredRows = data.filter(row =>
      row.name.toLowerCase().includes(searchFHW.toLowerCase())
    );
    setDataList(filteredRows);
  };
  useEffect(() => {
    filterData()
  }, [searchFHW]);


//   useEffect(() => {
//     // fetchListData();
// },[])


const token  = localStorage.getItem("JwtToken");


const fetchListData = async () => {

    try {
      console.log(token);
      const response = await axios.get('http://192.168.0.104:8080/doctor/viewDoctors');
      // const response = await axios.get('http://192.168.0.104:8080/doctor/viewDoctors',{
      //   headers : {
      //     Authorization : `Bearer ${token}`,
      //   }
      // });

      // Handle the API response
      setDataList(response.data);
      console.log(response);
    } catch (error) {
      // Handle errors
      console.log(error)
      // console.error(error);
    }

   

}

    return (
        <div className='list-table-grid'>
          <DataGrid
            rows={dataListWithIndex}
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