import Chip from '@mui/material/Chip';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import SupervisorContext from "../../utils/Context/SupervisorContext";
import UserDetailsContext from '../../utils/Context/UserContext';
import './Supervisor.css';
import { BASE_URL, getByUsername,sendMessageToFHW} from '../../utils/constants/URLS';
import SupervisorContext from '../../utils/Context/SupervisorContext';



const  ViewList = (props) => {

  const {role} = useParams();
  const navigate = useNavigate();
  const data=[];
  const [dialogOpen,setDialogOpen] = useState(false);
  const [dialogInputOpen,setDialogInputOpen] = useState(false);
  const [message,setMessage] = useState("");

  const {searchPatient} = useContext(SupervisorContext);
  // const {setUserDetails} = useContext(UserDetailsContext);
  const FHW_assign_Username = localStorage.getItem("FHW_assign_Username");
  const reqObj = {
    username:FHW_assign_Username,
  }
  console.log(reqObj);

  const sendMessage = async(msg) => {
    const id = localStorage.getItem("followUpId");
    const reqObj = {
      followUpId:id,
      message:msg,
    }
    try {
      console.log(token);   
      //to be continued
      const response = await axios.post(BASE_URL+sendMessageToFHW,reqObj,{
      headers : {
            Authorization : `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
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
      console.log("sent!!");
    } catch (error) {
      // Handle errors
      console.log(error)
      // console.error(error);
    }
    
  }

  const handleMessage = (row) => {
    localStorage.setItem("followUpId",row.followUpId);
    setDialogOpen(true);
  }
  const data_new =[
    {id:1,name:'Tanvi Motwani',gender:'Female',age:23,doctor:'Dr ABC',followup:'Date 123',status:'Assigned'}
  ]

  const columns = [
    { field: 'id', headerName: '#', flex: 1, headerClassName: 'header-highlight' },
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
    {
      field: 'message',
      headerName: 'Contact',
      width: 150,
      headerClassName: 'header-highlight',
      
      renderCell: (params) => ( params.row.status!=="completed"?<Button  variant="contained" style={{background : "#1976d2"}} onClick={() => handleMessage(params.row)}>Message</Button>:<></>
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
    case 'completed':
      return 'success'; // Green color
    default:
      return 'default';
  }
};


  
  

  const [dataList , setDataList] = useState(data);
  const [filteredDataList, setFilteredDataList] = useState([]);


  const filterData = () => {
    const filteredRows = dataList.filter(row =>
      row.name.toLowerCase().includes(searchPatient.toLowerCase())
    );
    setFilteredDataList(filteredRows);
  };
  useEffect(() => {
    console.log(searchPatient);
    filterData();
  }, [searchPatient]);


  useEffect(() => {
    fetchListData(reqObj);
},[])


const token  = localStorage.getItem("JwtToken");


const fetchListData = async (reqObj) => {

    try {
      console.log(token);
      const queryString = Object.keys(reqObj)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
      .join('&');
      console.log(queryString);
      const response = await axios.get(BASE_URL+getByUsername+queryString,{
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
      
      // setDataList(response.data);
      // console.log(response);
      console.log(response);
      const resData = response.data.healthRecord;
      const filteredData = resData.filter(obj=>obj.followUps!=null);
      console.log(filteredData);
      let count = 1;
      let data = filteredData.map((obj)=>(
        {
          name: obj.citizenDTO.name,
          gender: obj.citizenDTO.gender,
          age:obj.citizenDTO.age,
          doctor:obj.doctorDTO.name,
          followup:obj.followUps[(obj.followUps.length)-1].date,
          status:obj.followUps[(obj.followUps.length)-1].status,
          followUpId:obj.followUps[(obj.followUps.length)-1].id,
        }));
        data.sort((a,b)=>{
          if(a.status==="Assigned" && b.status==="completed")
          {
            return -1;
          }
          else if(a.status==="completed" && b.status==="Assigned")
          {
            return 1;
          }
          else
          {
            return 0;
          }
        })
        data = data.map((obj)=>(
          {
            ...obj,
            id:count++,
          }
        ));
        console.log(data);
        setDataList(data);
        setFilteredDataList(data);
        console.log(filteredDataList);
    } catch (error) {
      // Handle errors
      console.log(error)
      // console.error(error);
    }

   

} 

const handleDialogClose = () => {
  setDialogOpen(false);
}

const handleDialogInputClose = () => {
  setDialogInputOpen(false);
}

const handleAutoMessage = async() => {
  setDialogOpen(false);
  setMessage("");
  await sendMessage("null");
}

const handleCustomMessage = () => {
  setDialogOpen(false);
  setMessage("");
  setDialogInputOpen(true);
}

const handleDialogSubmit = async() => {
  setDialogInputOpen(false);
  // try {

  //   const reqObj = {
  //     q: message,
	// 	source: "auto",
	// 	target: "hi",
	// 	format: "text",
	// 	api_key: ""
  //   }
  //     const response = await axios.post("https://libretranslate.com/translate",reqObj,{
  //       headers: { "Content-Type": "application/json" }}
  //     );
  //     // const response = await axios.get('http://192.168.0.104:8080/doctor/viewDoctors',{
  //     //   headers : {
  //     //     Authorization : `Bearer ${token}`,
  //     //   }
  //     // });
  //     // Handle the API response
  //     // data={
  //     //   id: response.data.id,
  //     //   name: response.data.name,
  //     //   age: response.data.age,
  //     //   gender: response.data.gender,
  //     //   email: response.data.email,
  //     //   contact
  //     // };
  //     // setDataList(response.data);
  //     console.log(response.json());
  //   } catch (error) {
  //     // Handle errors
  //     console.log(error)
  //     // console.error(error);
  //   }
  console.log(message);
  await sendMessage(message);
    setMessage("");
}

const handleMessageChange = (e) =>{
  setMessage(e.target.value);
}

    return (
      <div>
        <div className='list-table-grid'>
          <DataGrid
            rows={filteredDataList.map((item, index) => ({ ...item, index: index+ 1 }))}
            // rows = {data_new}
            columns={columns}
            // initialState={{
            //   pagination: false,
            // }}
            // pageSizeOptions={[5, 10]}
            autoHeight
            // autoPageSize
          />
        </div>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Select Message Type</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Would you like to send a custom message or auto generated message?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAutoMessage} style={{textTransform:'none'}}>Auto Generated</Button>
            <Button onClick={handleCustomMessage}  style={{textTransform:'none'}}>Custom</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={dialogInputOpen} onClose={handleDialogInputClose}>
          <DialogTitle>Type Message</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Enter Custom message for Field HealthCare Worker
              <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            onChange={handleMessageChange}
            value={message}
            style={{width:'100%'}}
          />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogSubmit}  style={{textTransform:'none'}}>Submit</Button>
          </DialogActions>
        </Dialog>
        </div>
      );
}

export default ViewList;