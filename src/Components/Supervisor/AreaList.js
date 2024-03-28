import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupervisorContext from '../../utils/Context/SupervisorContext';





const  AreaList = (props) => {

  const navigate = useNavigate();
  const data = [];

  const {searchArea} = useContext(SupervisorContext);

  const handleView = (data) => {
    if(data.fhw==="Not Assigned")
    {
      navigate("/supervisor/FHWList");
    }
    else{
      navigate("/supervisor/AreaPatientlist")
    }
  }

  let requestObj = {
    username : "",
  };

  

  const columns = [
    { field: 'index', headerName: '#', flex : 1 },
    {field: 'area' , headerName: 'Area', flex : 2},
    {field: 'fhw', headerName: 'FHW',flex: 2},
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
      width: 150,
      renderCell: (params) => (
        <Button  variant="contained" color="primary" onClick={() => handleView(params.row)}>View</Button>
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
    fetchListData();
},[])


const token  = localStorage.getItem("JwtToken");


const fetchListData = async () => {

    try {
      // console.log(token);
      const areaResponse = await axios.get('http://192.168.0.104:8080/getAreas',requestObj);
      // const response = await axios.get('http://192.168.0.104:8080/doctor/viewDoctors',{
      //   headers : {
      //     Authorization : `Bearer ${token}`,
      //   }
      // });

      // Handle the API response
      console.log(areaResponse);
      const data = areaResponse.data;
      data.array.forEach(obj => {
        obj["fhw"] = "";
      });
      requestObj = {
        districtId:""
      }
      const fhwResponse = await axios.get('http://192.168.0.104:8080/getFHW',requestObj);
      const objMap = new Map();
      fhwResponse.data.array.forEach(obj => {
      if(obj.localArea.id != null)
      {
        objMap.set(obj.localArea.id,obj.name);
      }
      });
      data.array.forEach(obj => {
        if(objMap.has(obj.id))
        {
          data["fhw"] = objMap.get(obj.id);
        }
        else
        {
          data["fhw"] = "Not Assigned";
        }
      });
      setDataList(data);
      console.log(data);
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

export default AreaList;