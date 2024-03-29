import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import SearchContext from '../../utils/Context/SearchContext';
import { Button } from '@mui/material';
import UserDetailsContext from '../../utils/Context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';




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
    { field: 'index', headerName: '#', flex : 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    // { field: 'district', headerName: 'District', flex: 1 },
    { field: 'licenseId', headerName: 'LicenseID', flex: 2 },
    { field: 'specialty', headerName: 'Speciality', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'edit',
      headerName: 'Action',
      width: 110,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleEdit(params.row)}>Edit</Button>
      ),
    },
];


  
  const data = [
    {
      "id": 1,
      "name": "Arjun Gangani",
      "licenseId": "123456789",
      "age": 24,
      "gender": "Male",
      "specialty": "physiatrist",
      "email": "aj@gmail.com",
      "username": "DR80784",
      "district" : "AMreli",
      "password": "FCzYBTuTW1"
    },
    {
      "id": 2,
      "name": "abhishek sharma",
      "licenseId": "12434567890",
      "age": 22,
      "gender": "Men",
      "specialty": "psychiatrist",
      "email": "abhi@gmail.com",
      "username": "DR89871",
      "password": "LGv0ey8kPs"
    },
    {
      "id": 3,
      "name": "Harsh Sureshbhai Ranpariya",
      "licenseId": "123456",
      "age": 23,
      "gender": "Men",
      "specialty": "psychiatrist",
      "email": "harsh.ranpariya@iiitb.ac.in",
      "username": "DR22998",
      "password": "tflsbfuWbk"
    },
    {
      "id": 4,
      "name": "Harsh Ranpariya",
      "licenseId": "1234ghrth",
      "age": 23,
      "gender": "Men",
      "specialty": "psychiatrist",
      "email": "shupatel03@gmail.com",
      "username": "DR89038",
      "password": "POMPs9hn4n"
    },
    {
      "id": 5,
      "name": "Smit Mehta",
      "licenseId": "dfvugbgiw",
      "age": 24,
      "gender": "Men",
      "specialty": "psychiatrist",
      "email": "smit@gmail.com",
      "username": "DR35430",
      "password": "ks0s4gOmRL"
    },
    {
      "id": 6,
      "name": "Tanvi Motwani",
      "licenseId": "tan456",
      "age": 23,
      "gender": "Women",
      "specialty": "psychiatrist",
      "email": "tanvi@gmail.com",
      "username": "DR98922",
      "password": "c5RMmAy31l"
    }
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