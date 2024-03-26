import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchContext from '../../utils/Context/SearchContext';
import UserDetailsContext from '../../utils/Context/UserContext';




const  ViewList = (props) => {

  const {role} = useParams();
  const navigate = useNavigate();

  const {setUserDetails} = useContext(UserDetailsContext);

  const handleEdit = (data) => {
    console.log(data);
    setUserDetails(data);
    navigate("/register/" + role);
  }

  

  const columns = [
    { field: 'id', headerName: 'ID', flex : 1 },
    { field: 'name', headerName: 'Patient Name', flex: 2 },
    { field: 'age', headerName: 'Pateint Age', flex: 1 },
    { field: 'gender', headerName: 'Doctor Assigned', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'follow up', headerName: 'Follow Up', flex: 1 },
];
const data = [
  { id: 'A12345', name: 'Aarav Sharma', age: 35, gender: 'Male', doctorAssigned: 'Dr. Singh', date: '2024-03-01' },
  { id: 'A12346', name: 'Aditi Patel', age: 28, gender: 'Female', doctorAssigned: 'Dr. Gupta', date: '2024-03-02' },
  { id: 'A12347', name: 'Aryan Kumar', age: 42, gender: 'Male', doctorAssigned: 'Dr. Mishra', date: '2024-03-03' },
  { id: 'A12348', name: 'Diya Shah', age: 39, gender: 'Female', doctorAssigned: 'Dr. Joshi', date: '2024-03-04' },
  { id: 'A12349', name: 'Ishaan Gupta', age: 31, gender: 'Male', doctorAssigned: 'Dr. Reddy', date: '2024-03-05' },
  { id: 'A12350', name: 'Krishna Patel', age: 45, gender: 'Female', doctorAssigned: 'Dr. Choudhary', date: '2024-03-06' },
  { id: 'A12351', name: 'Rohan Singh', age: 37, gender: 'Male', doctorAssigned: 'Dr. Sharma', date: '2024-03-07' },
  { id: 'A12352', name: 'Sanaya Jain', age: 29, gender: 'Female', doctorAssigned: 'Dr. Verma', date: '2024-03-08' },
  { id: 'A12353', name: 'Vivaan Kumar', age: 40, gender: 'Male', doctorAssigned: 'Dr. Yadav', date: '2024-03-09' },
  { id: 'A12354', name: 'Zara Sharma', age: 33, gender: 'Female', doctorAssigned: 'Dr. Singhania', date: '2024-03-10' },
  { id: 'A12355', name: 'Arjun Gupta', age: 47, gender: 'Male', doctorAssigned: 'Dr. Tiwari', date: '2024-03-11' },
  { id: 'A12356', name: 'Dia Patel', age: 30, gender: 'Female', doctorAssigned: 'Dr. Shukla', date: '2024-03-12' },
  { id: 'A12357', name: 'Kabir Singh', age: 38, gender: 'Male', doctorAssigned: 'Dr. Chaturvedi', date: '2024-03-13' },
  { id: 'A12358', name: 'Meera Mishra', age: 32, gender: 'Female', doctorAssigned: 'Dr. Trivedi', date: '2024-03-14' },
  { id: 'A12359', name: 'Riya Joshi', age: 41, gender: 'Male', doctorAssigned: 'Dr. Gupta', date: '2024-03-15' }
];


  
  

  const { searchText } = useContext(SearchContext);

  const [dataList , setDataList] = useState(data);

  const dataListWithIndex = dataList.map((item, index) => ({ ...item, index: index + 1 }));
  

  const filterData = () => {
    const filteredRows = data.filter(row =>
      row.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDataList(filteredRows);
  };
  useEffect(() => {
    filterData()
  }, [searchText]);


  useEffect(() => {
    // fetchListData();
},[])


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