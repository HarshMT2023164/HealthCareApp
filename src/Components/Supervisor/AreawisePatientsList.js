import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import SupervisorContext from "../../utils/Context/SupervisorContext";
import UserDetailsContext from '../../utils/Context/UserContext';
import './Supervisor.css';



const  ViewList = (props) => {

  const {role} = useParams();
  const navigate = useNavigate();
  const data=[];

  const {setUserDetails} = useContext(UserDetailsContext);
  const FHW_assign_Username = localStorage.getItem("FHW_assign_Username");
  const reqObj = {
    username:FHW_assign_Username,
  }
  console.log(reqObj);
 

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'header-highlight' },
    { field: 'name', headerName: 'Patient Name', flex: 1, headerClassName: 'header-highlight' },
    { field: 'gender', headerName: 'Gender', flex: 1, headerClassName: 'header-highlight' },
    { field: 'age', headerName: 'Patient Age', flex: 1, headerClassName: 'header-highlight' },
    { field: 'doctor', headerName: 'Doctor Assigned', flex: 1, headerClassName: 'header-highlight' },
    { field: 'followup', headerName: 'Last Assigned', flex: 2, headerClassName: 'header-highlight' },
    { 
      field: 'status', 
      headerName: ' Followup-Status', 
      flex: 1,
      headerClassName: 'header-highlight',
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getColor(params.value)}
          variant="filled"
          style={{ borderRadius: '0px', backgroundColor: getColor(params.value), width: '150px' }}
        />
      ),
    },
  ];
  
// const data = [
//   { id: 'A12345', name: 'Aarav Sharma', age: 35, doctorAssigned: 'Dr. Singh', date: '2024-03-01', followUp: 'Pending' },
//   { id: 'A12346', name: 'Aditi Patel', age: 28, doctorAssigned: 'Dr. Gupta', date: '2024-03-02', followUp: 'Done' },
//   { id: 'A12347', name: 'Aryan Kumar', age: 42, doctorAssigned: 'Dr. Mishra', date: '2024-03-03', followUp: 'Not Required' },
//   { id: 'A12348', name: 'Diya Shah', age: 39, doctorAssigned: 'Dr. Joshi', date: '2024-03-04', followUp: 'Pending' },
//   { id: 'A12349', name: 'Ishaan Gupta', age: 31, doctorAssigned: 'Dr. Reddy', date: '2024-03-05', followUp: 'Done' },
//   { id: 'A12350', name: 'Krishna Patel', age: 45, doctorAssigned: 'Dr. Choudhary', date: '2024-03-06', followUp: 'Pending' },
//   { id: 'A12351', name: 'Rohan Singh', age: 37, doctorAssigned: 'Dr. Sharma', date: '2024-03-07', followUp: 'Done' },
//   { id: 'A12352', name: 'Sanaya Jain', age: 29, doctorAssigned: 'Dr. Verma', date: '2024-03-08', followUp: 'Not Required' },
//   { id: 'A12353', name: 'Vivaan Kumar', age: 40, doctorAssigned: 'Dr. Yadav', date: '2024-03-09', followUp: 'Pending' },
//   { id: 'A12354', name: 'Zara Sharma', age: 33, doctorAssigned: 'Dr. Singhania', date: '2024-03-10', followUp: 'Done' },
//   { id: 'A12355', name: 'Arjun Gupta', age: 47, doctorAssigned: 'Dr. Tiwari', date: '2024-03-11', followUp: 'Pending' },
//   { id: 'A12356', name: 'Dia Patel', age: 30, doctorAssigned: 'Dr. Shukla', date: '2024-03-12', followUp: 'Done' },
//   { id: 'A12357', name: 'Kabir Singh', age: 38, doctorAssigned: 'Dr. Chaturvedi', date: '2024-03-13', followUp: 'Pending' },
//   { id: 'A12358', name: 'Meera Mishra', age: 32, doctorAssigned: 'Dr. Trivedi', date: '2024-03-14', followUp: 'Not Required' },
//   { id: 'A12359', name: 'Riya Joshi', age: 41, doctorAssigned: 'Dr. Gupta', date: '2024-03-15', followUp: 'Pending' }
// ];

const getColor = (status) => {
  switch (status) {
    case 'Assigned':
      return 'default';
    case 'Completed':
      return 'success'; // Green color
    default:
      return 'default';
  }
};


  
  

  const { searchPatient,setSearchPatient} = useState('');

  const [dataList , setDataList] = useState(data);

  const dataListWithIndex = dataList.map((item, index) => ({ ...item, index: index + 1 }));


  const filterData = () => {
    const filteredRows = data.filter(row =>
      row.name.toLowerCase().includes(searchPatient.toLowerCase())
    );
    setDataList(filteredRows);
  };
  useEffect(() => {
    filterData()
  }, [searchPatient]);


  useEffect(() => {
    fetchListData(reqObj);
},[])


const token  = localStorage.getItem("JwtToken");


const fetchListData = async (reqObj) => {

    try {
      console.log(token);
      const response = await axios.post('http://192.168.127.137:8080/FieldHealthCareWorker/getByUsername',reqObj,{
        headers : {
              Authorization : `Bearer ${token}`,
            }
      });
      // const response = await axios.get('http://192.168.0.104:8080/doctor/viewDoctors',{
      //   headers : {
      //     Authorization : `Bearer ${token}`,
      //   }
      // });

      // Handle the API response
      
      // setDataList(response.data);
      // console.log(response);
      const resData = response.data.healthRecord;
      const filteredData = resData.filter(obj=>obj.followUps!=null);
      console.log(filteredData);
      let count = 1;
      let data = filteredData.map((obj)=>(
        {
          id:count++,
          name: obj.citizenDTO.name,
          gender: obj.citizenDTO.gender,
          age:obj.citizenDTO.age,
          doctor:obj.doctorDTO.name,
          followup:obj.followUps[(obj.followUps.length)-1].date,
          status:obj.followUps[(obj.followUps.length)-1].status,
        }));
        setDataList(data);
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

export default ViewList;