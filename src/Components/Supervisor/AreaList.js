import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import SearchContext from '../../utils/Context/SearchContext';
import { Button } from '@mui/material';
import UserDetailsContext from '../../utils/Context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import SupervisorContext from '../../utils/Context/SupervisorContext';




const  ViewList = (props) => {

  const navigate = useNavigate();

  const {searchArea} = useContext(SupervisorContext);

  const handleView = (data) => {
    console.log("Working");
    // console.log(data);
    // setUserDetails(data);
    // navigate("/register/" + role);
  }

  

  const columns = [
    { field: 'index', headerName: '#', flex : 1 },
    {field: 'area' , headerName: 'Area', flex : 1},
    {field: 'fhw', headerName: 'FHW',flex: 1},
    {field: 'pincode', headerName: 'Pincode', flex:1},
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
      width: 110,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleView(params.row)}>View</Button>
      ),
      flex:1
    },
];


  
  const data = [
    { id: 1, area: 'Adajan', fhw: 'John Doe', pincode: '395009' },
    { id: 2, area: 'Athwa', fhw: 'Jane Smith', pincode: '395007' },
    { id: 3, area: 'Piplod', fhw: 'Not Assigned', pincode: '395007' },
    { id: 4, area: 'Varachha', fhw: 'Emily Brown', pincode: '395006' },
    { id: 5, area: 'Katargam', fhw: 'David Wilson', pincode: '395004' },
    { id: 6, area: 'Rander', fhw: 'Not Assigned', pincode: '395005' },
    { id: 7, area: 'Udhna', fhw: 'Christopher Lee', pincode: '394210' },
    { id: 8, area: 'Pal', fhw: 'Not Assigned', pincode: '394210' },
    { id: 9, area: 'Sarthana', fhw: 'Matthew Garcia', pincode: '395006' },
    { id: 10, area: 'Katargam', fhw: 'Not Assigned', pincode: '395004' },
  ];

  const [dataList , setDataList] = useState(data);

  const dataListWithIndex = dataList.map((item, index) => ({ ...item, index: index + 1 }));
  

  const filterData = () => {
    const filteredRows = data.filter(row =>
      row.area.toLowerCase().includes(searchArea.toLowerCase())
    );
    setDataList(filteredRows);
  };
  useEffect(() => {
    filterData()
  }, [searchArea]);


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
            sx={{
              '& .simple-row': {
                backgroundColor: '#FAF9F6',
              },
            }}
            getRowClassName={(params) => (params.row.fhw === 'Not Assigned' ? '' : 'simple-row')}
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