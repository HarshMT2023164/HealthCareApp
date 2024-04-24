import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SupervisorContext from '../../utils/Context/SupervisorContext';
import { BASE_URL,getLocalAreas } from '../../utils/constants/URLS';
import './Supervisor.css';


const  AreaList = (props) => {

  const navigate = useNavigate();

  const data = [];
 
  const {searchArea,setSearchArea} = useContext(SupervisorContext);
  // const {supervisor,setSupervisor} = useContext(SupervisorContext);


  const handleView = (rowData) => {
    if(rowData.fhw==="Not Assigned")
    {
      localStorage.setItem("localAreaId",rowData.id);
      navigate("/supervisor/FHWList");
    }
    else{
      localStorage.setItem("FHW_assign_Username",rowData.fhwUsername);
      localStorage.setItem("FHWName",rowData.fhw);
      localStorage.setItem("AreaName",rowData.area);
      navigate("/supervisor/AreaPatientlist")
    }
  }

  const columns = [
    { field: 'index', headerName: '#', flex : 1, headerClassName: 'header-highlight'},
    {field: 'area' , headerName: 'Area', flex : 2 , headerClassName: 'header-highlight'},
    {field: 'fhw', headerName: 'Field Health Worker Name',flex: 2 , headerClassName: 'header-highlight'},
    {field: 'pincode', headerName: 'Pincode', flex:1 , headerClassName: 'header-highlight'},
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
        <Button  variant="contained" style={{background : "#11B3CF"}} onClick={() => handleView(params.row)}>View</Button>
      ),
      flex:1
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
      row.area.toLowerCase().includes(searchArea.toLowerCase())
    );
    setFilteredDataList(filteredRows);
  };
  useEffect(() => {
    filterData()
  }, [searchArea]);


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
      const response = await axios.get(BASE_URL+getLocalAreas+queryString,{
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
      console.log(response.data)
      let count=1;
      let data = response.data.map((obj)=>(
      {
        id:count++,
        area:obj.name,
        fhw:obj.fieldHealthcareWorkerDTO==null?"Not Assigned":obj.fieldHealthcareWorkerDTO.name,
        fhwUsername:obj.fieldHealthcareWorkerDTO==null?"":obj.fieldHealthcareWorkerDTO.username,
        pincode:obj.pincode,
      }));
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

export default AreaList;