import { NoteAlt } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';
import './dashboard.css';

import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'antd';
import axios from 'axios';

const pieParams = { height: 200, margin: { right: 5 } };
//const palette = ['#19cfcc', '#05a8fa', '#0054d1'];
const palette = ['#19cfcc', '#05a8fa', '#0054d1', '#999999','#33cccc','#66cccc','#0080ff','#999999', '#00ccff','#333333'];

const Dashboard = () => {    
    const [totalCitizens, setTotalCitizens] = useState(0);
    const [totalPatients, setTotalPatients] = useState(0);
    const [followupStatusOngoing, setFollowupStatusOngoing] = useState(0);
    const [followupStatusCompleted,setFollowupStatusCompleted]= useState(0);
    const [genDist,setgenDist]=useState({});
    const [ageDist,setageDist] =useState({});
    const [selectedCity, setSelectedCity] = useState("");
     const [monthData, setMonthData] = useState([]);
    const [wholeMonthData, setWholeMonthData] = useState([]);
    const [icdData,setICDData] = useState([])


    const reqObj= {
   city:selectedCity
      // city:'Rajkot'
    }

   // const data = [];
    
    const handleView = (row) => {
        //row .city
        //fetchData(row.district);
       
        setSelectedCity(row.districtName);
        // fetchData(selectedCity);
      }
      const handleOverview = () => {
        setSelectedCity(''); // Set selectedCity to null
        // Refetch data here
        // For example, you can call fetchData(selectedCity) again
        // fetchData(selectedCity);
    };
    const fetchTotalCitizens = async () => {
        try {
            const queryString = Object.keys(reqObj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
            .join('&');
            const response = await axios.get('http://192.168.125.148:8081/dashboard/totalCitizens?'+queryString);
            console.log("total no. of citizens "+response.data);
            return response.data;
            //setTotalCitizens(response.data);
        } catch (error) {
            console.error('Error fetching total citizens data:', error);
            return 0; // Return default value or handle error accordingly
        }
    };
    
    const fetchTotalConsent = async () => {
        try {
            const queryString = Object.keys(reqObj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
            .join('&');
            const response = await axios.get('http://192.168.125.148:8081/dashboard/consentStatus?'+queryString);
            console.log("Total no of patients i.e who accepted consent " +response.data);
            return response.data.trueCount;
            //setTotalPatients(response.data);
        } catch (error) {
            console.error('Error fetching total consent data:', error);
            return 0; // Return default value or handle error accordingly
        }
    };
    
    const fetchCitizensByFollowupStatus = async () => {
        try {
            const queryString = Object.keys(reqObj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
            .join('&');
            const response = await axios.get('http://192.168.125.148:8081/dashboard/citizensByFollowupStatus?'+queryString);
            // const data = response.data;
            // const ongoingCount = data.find(status => status[0] === "ongoing")[1];
            //return ongoingCount;
            console.log(response.data);
            return response.data;
           
            //setFollowupStatus(response.data);
        } catch (error) {
            console.error('Error fetching follow-up status data:', error);
            return 0; // Return default value or handle error accordingly
        }
    };
    const genderDistribution = async () => {
        try {
            const queryString = Object.keys(reqObj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
            .join('&');
            const response = await axios.get('http://192.168.125.148:8081/dashboard/genderDistribution?'+queryString);
            // const data = response.data;
            // const ongoingCount = data.find(status => status[0] === "ongoing")[1];
            //return ongoingCount;
            console.log("gender wise output:",response.data);
            return response.data;
           
            //setFollowupStatus(response.data);
        } catch (error) {
            console.error('Error fetching follow-up status data:', error);
            return 0; // Return default value or handle error accordingly
        }
    };
    const ageDistribution = async () => {
        try {
            const queryString = Object.keys(reqObj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
            .join('&');
            const response = await axios.get('http://192.168.125.148:8081/dashboard/ageDistribution?'+queryString);
            
            console.log(response.data);
            return response.data;
           
           
        } catch (error) {
            console.error('Error fetching follow-up status data:', error);
            return 0; // Return default value or handle error accordingly
        }
    };
    

    useEffect(() => {
        fetchData();
    }, [selectedCity]);
 
    let columns = [
        { field: 'id', headerName: '#',headerClassName: 'main-heading' },
        { field: 'districtName', headerName: 'District Name', headerClassName: 'main-heading', flex: 1 },
        { field: 'totalCitizens', headerName: ' Citizens', headerClassName: 'main-heading',flex: 1 },
        { field: 'numPatients', headerName: ' Total No. of Patients', headerClassName: 'main-heading', flex: 1 },
        { field: 'ongoingFollowUps', headerName: ' Ongoing Follow Ups',headerClassName: 'main-heading',  flex: 1 },
        { field: 'completedFollowUps', headerName: ' Completed Follow Ups',headerClassName: 'main-heading',  flex: 1 },
        {
            field: 'assign',
            headerName: 'Action',
            width: 150,
            headerClassName: 'main-heading',
            
            renderCell: (params) => (
                <Button variant="contained" style={{ background: 'lightgray'}} onClick={() => { handleView(params.row) }}>View</Button>
            )
            
          },
      ];
      
      const rowStyles = {
        '&.Mui-selected': {
          backgroundColor: 'red', // Change background color when row is selected
        },
        // '&:hover': {
        //   backgroundColor: 'lightgray', // Change background color on hover
        // },
      };

const [dataList , setDataList] = useState([]);
const [filteredDataList, setFilteredDataList] = useState([]);

const filterData = () => {
    const filteredRows = dataList.filter(row =>
      row.districtName.toLowerCase()
    );
    setFilteredDataList(filteredRows);
  };

  useEffect(() => {
    filterData()
  }, []);


const fetchMonthData = async () => {
    try {
        const queryString = Object.keys(reqObj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
            .join('&');
            const response = await axios.get('http://192.168.125.148:8081/dashboard/cityData?'+queryString);
            console.log(response.data);
           
        //let count =1;
        let data = [];
        let currObj = {};
        let innerObj = {};
        let consentObj = {};
        let followupArray = [];
        for(let obj in response.data.monthWiseData)
            {
               //console.log(obj);
                currObj = {};
                // currObj['id'] = count++;
                currObj['month'] = obj;
                innerObj = response.data.monthWiseData[obj];
                currObj['Citizens'] = innerObj['totalCitizens'];
                currObj['Patients']=innerObj['consentStatusTrue'];

                
                followupArray = innerObj['followupStatus']?innerObj['followupStatus']:[];
               currObj["Ongoing"]=followupArray[0]?followupArray[0]=='ongoing'?followupArray[0][1]:0:0;
               currObj["Completed"]=followupArray[0]?followupArray[0]=='completed'?followupArray[0][1]:0:0;
               currObj["Completed"]=followupArray[1]?followupArray[1]=='completed'?followupArray[1][1]:0:0;
                //currObj['completedFollowUps'] = followupArray?followupArray[2]?followupArray[2][1]?followupArray[2][1]:0:0:0;
                data.push(currObj);
            }
            console.log("monvce",data);
       //await setMonthData(data);
       console.log("Set or not:",monthData);
       return data;
    } catch (error) {
        console.error('Error fetching month-wise data:', error);
    }
};
const cityWiseData = async () => {
    try {
     
      console.log(reqObj);
      const queryString = Object.keys(reqObj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
            .join('&');
      const response = await axios.get('http://192.168.125.148:8081/dashboard/cityWiseData?'+queryString);
        console.log(response.data);
        let count =1;
        let data = [];
        let currObj = {};
        let innerObj = {};
        let consentObj = {};
        let followupObj={};
        //let followupArray = [];
        for(let obj in response.data)
            {
                currObj = {};
                currObj['id'] = count++;
                currObj['districtName'] = obj;
                innerObj = response.data[obj];
                currObj['totalCitizens'] = innerObj['totalCitizens'];
                consentObj = innerObj['consentStatus'];
                currObj['numPatients'] = consentObj['trueCount'];
                //followupArray = innerObj['followupStatus'];
                followupObj = innerObj['followupStatus']?innerObj['followupStatus']:{};
                currObj["ongoingFollowUps"]=followupObj?followupObj['ongoing']?followupObj['ongoing']:0:0;
                currObj['completedFollowUps']=followupObj?followupObj['completed']?followupObj['completed']:0:0;
                // currObj["ongoingFollowUps"]=followupArray?followupArray[1]?followupArray[1][1]?followupArray[1][1]:0:0:0;
                // currObj['completedFollowUps'] = followupArray?followupArray[2]?followupArray[2][1]?followupArray[2][1]:0:0:0;
                data.push(currObj);
            }

        // let count = 1;
        // let data = Object.entries(response.data).map(([cityName, cityInfo]) => ({
        //     id: count++,
        //     districtName: cityName,
        //     totalCitizens: cityInfo.totalCitizens,
        //     numPatients: cityInfo.consentStatus.trueCount + cityInfo.consentStatus.falseCount,
        //     ongoingFollowUps: cityInfo.followupStatus.find(status => status[0] === "ongoing")[1],
        //     completedFollowUps: cityInfo.followupStatus.find(status => status[0] === "completed")[1]
        // }));
       
        await setDataList(data);
        await setFilteredDataList(data);
      return response.data;
    } catch (error) {
      // Handle errors
      console.log(error)
      // console.error(error);
    }
}
const wholeMonthWiseData = async () => {
    try {
        const queryString = Object.keys(reqObj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
            .join('&');
           
            const response=  await axios.get('http://192.168.125.148:8081/dashboard/monthwiseData');
            //console.log(re.data);
            console.log(response.data);
        
            let count =1;
        let data = [];
        let currObj = {};
        let innerObj = {};
        let consentObj = {};
        let followupObj = [];
        for(let obj in response.data)
            {
               //console.log(obj);
                currObj = {};
                //currObj['id'] = count++;
                currObj['month'] = obj;
                innerObj = response.data[obj];
               
                currObj['Citizens'] = innerObj['totalCitizens'];
                consentObj=innerObj['consentStatus']
                currObj['Patients']=consentObj['trueCount'];
                
                followupObj = innerObj['followupStatus']?innerObj['followupStatus']:{};
                currObj['Ongoing']=followupObj?followupObj['ongoing']?followupObj['ongoing']:0:0;
                currObj['Completed']=followupObj?followupObj['completed']?followupObj['completed']:0:0;
                //currObj['completedFollowUps'] = followupArray?followupArray[2]?followupArray[2][1]?followupArray[2][1]:0:0:0;
                data.push(currObj);
            }
            console.log("whole state data",data);
            // await setWholeMonthData(data);
         return data;
       
    } catch (error) {
        console.error('Error fetching month-wise data:', error);
    }
};
const icdcodes = async () => {
   

    try {
        const queryString = Object.keys(reqObj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(reqObj[key])}`)
        .join('&');
        const response = await axios.get('http://192.168.125.148:8081/dashboard/icd10-codes?'+queryString);
        //console.log(response.data);
        // const mainData = {
        //     "F20.0": { description: "Used for cases of schizophrenia with predominant delusions or auditory hallucinations.", count: 0 },
        //     "F25.0": { description: "Used for cases of schizoaffective disorder where there is a manic or hypomanic episode.", count: 0 },
        //     "F44.81": { description: "Used for cases of dissociative identity disorder, characterized by the presence of two or more distinct personality states.", count: 0 },
        //     "F63.9": { description: "Used for cases of habit and impulse disorders that are not specified further.", count: 0 },
        //     "F45.1": { description: "Used for cases of somatization disorder, where there are multiple physical symptoms without a known medical cause.", count: 0 },
        //     "F51.0": { description: "Used for cases of insomnia that are not due to a known organic cause.", count: 0 },
        //     "F68.10": { description: "Used for cases of factitious disorder where the symptoms are primarily psychological in nature.", count: 0 },
        //     "F32.2": { description: "Used for cases of severe major depressive disorder without psychotic features.", count: 0 },
        //     "F64.1": { description: "Used for cases of gender dysphoria in individuals who are adolescents or adults.", count: 0 },
        //     "F06.30": { description: "Used for cases of mood disorder that are due to a known medical condition but are not further specified.", count: 0 }
        // };
        

        // //Simulate API call to get data
        // const response = {
        //     data: {
        //         "F20.0": 41,
        //         "F25.0": 36,
        //         "F44.81": 41,
        //         "F63.9": 0, // Not included in the provided main data
        //         "F45.1": 0, // Not included in the provided main data
        //         "F51.0": 32,
        //         "F68.10": 39,
        //         "F32.2": 37,
        //         "F64.1": 0, // Not included in the provided main data
        //         "F06.30": 33
        //     }
        // };

        // Extracting data from the response
        const data = Object.entries(response.data).map(arr => ({
            value: arr[1],
            label: arr[0].substring(0, 5)
        }));
        // await setICDData(data);
        return data;
        // Sorting data by count in descending order
        // const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);

        
        // // Extracting labels and counts
        // const labels = sortedData.map(([label, count]) => `${label} (${count})`);
        // console.log(labels);

        
        // const counts = sortedData.map(([code, count]) => count);
        // console.log(counts);
        //const topLabels = labels;
        // const topCounts = counts;
        // const otherLabel = 'Other';
        // console.log(counts);
        // // Calculating total count
        //  const totalCount = counts.reduce((total, count) => total + count, 0);
        // console.log(totalCount);
        // // Calculating the threshold for the top 70% data
        // const threshold = totalCount * 0.7;
        // console.log(threshold);
        // // Finding the index where the threshold is reached
        // let sum = 0;
        // let thresholdIndex = counts.findIndex(count => {
        //     sum += count;
        //     return sum >= threshold;
        // });
        // console.log(thresholdIndex);

        // // If thresholdIndex is -1, it means the threshold wasn't reached, so use the entire dataset
        // if (thresholdIndex === -1) {
        //     thresholdIndex = labels.length;
        // }
        
        // // Slice the data into top 70% and 'Other'
        // const topLabels = labels.slice(0, thresholdIndex);
        // const topCounts = counts.slice(0, thresholdIndex);
        // const otherLabel = 'Other';
        // const otherCount = counts.slice(thresholdIndex).reduce((total, count) => total + count, 0);

        // // Add 'Other' data to the top data
        // topLabels.push(otherLabel);
        // topCounts.push(otherCount);
        // console.log(topLabels);

        // // Return the data
        // return {
        //     labels: topLabels,
        //     counts: topCounts
        // };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

    const fetchData = async () => {
        try {
            const [totalCitizensData, totalConsentData, followupStatusData,genderDistributionData,ageDistributionData,wholeMonthWisedata,monthWisedata,icdcodesData] = await Promise.all([
               
                fetchTotalCitizens(),
                fetchTotalConsent(),
                fetchCitizensByFollowupStatus(),
                genderDistribution(),
                ageDistribution(), 
                wholeMonthWiseData(),
                fetchMonthData(),
                icdcodes(),
                cityWiseData(),
                
            ]);
            
             setTotalCitizens(totalCitizensData);
             setTotalPatients(totalConsentData);
             setFollowupStatusOngoing(followupStatusData[2][1]);
             setFollowupStatusCompleted(followupStatusData[1][1]);
             setgenDist(genderDistributionData);
             setageDist(ageDistributionData);
             setWholeMonthData(wholeMonthWisedata);
             setMonthData(monthWisedata);
            
             setICDData(icdcodesData);
             console.log(icdData);
           //console.log(wholeMonthWiseData);
            //setWholeMonthData(wholeData);
           
            console.log(wholeMonthData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
          totalCitizens && (
             <Grid container className="container">   
           
                <Paper variant='outlined' elevation={5} sx={{flexDirection:'column',rowGap:'100px',alignContent:'center',width:'1500px',backgroundColor:'#fafafa'}} >
                <Card  className='title' variant='outlined' elevation={0}  style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                     <Typography variant="h2" vartextAlign='center' component="div" >HealthCare Dashboard</Typography>
                 </Card>
                 <div>
                 <Card  variant='outlined' elevation={4}  style={{marginTop:'20px',alignContent:'center',justifyContent:'center',marginLeft:'40px',height:'40px',width:'350px',display:'flex',flexDirection:'row',backgroundColor:'white'}}>
                 <Typography variant="h6" marginTop='3px'>
                                        {selectedCity==''?"OVERVIEW":"District : "+selectedCity}
                    </Typography>
                    <Button variant="contained" style={{ marginLeft:'50px',marginTop:'5px',background: 'lightgray' }} onClick={handleOverview}>Reset</Button>
                 </Card>
                   
                 </div>
                    <div className='card'>
                    
                        <Paper className='paper-container'  elevation={3}>
                       
                            <CardContent sx={{display:'flex',flexDirection:'column',rowGap:'2px',alignItems:'flex-start'}}>
                                
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',columnGap:20}}>
                                <Avatar sx={{bgcolor:'#f5f5f5',border:'1px solid lightgray'}}>
                                        <NoteAlt sx={{color:'#11b3cf'}}/>
                                    </Avatar>
                                <Typography variant="h6" component="div" fontWeight='bold'>
                                    {/* <Icon sx={{color:'#11B3cf'}} fontSize='small' style={{marginRight:'18px'}}><NoteAlt/></Icon> */}
                                    Citizens
                                </Typography>
                                </div>
                                <Typography sx={{color:'#11B3cf'}} fontSize='30px' fontWeight='bold' variant="body2" style={{marginLeft:'17%'}}>
                                    {/* 1000 */}{totalCitizens}
                                </Typography>
                            </CardContent>
                        </Paper>
                        <Paper className='paper-container'  elevation={3}>
                            <CardContent sx={{display:'flex',flexDirection:'column',rowGap:'2px',alignItems:'flex-start'}}>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',columnGap:10}}>
                                <Avatar sx={{bgcolor:'#f5f5f5',border:'1px solid lightgray'}}>
                                        <NoteAlt sx={{color:'#11b3cf'}}/>
                                    </Avatar>
                                <Typography variant="h6" component="div" fontWeight='bold'>
                                    {/* <Icon sx={{color:'#11B3cf'}} fontSize='small' style={{marginRight:'18px'}}><NoteAlt/></Icon> */}
                                    Patients
                                </Typography>
                                </div>
                                <Typography sx={{color:'#11B3cf'}} fontSize='30px' fontWeight='bold' variant="body2" style={{marginLeft:'17%'}}>
                                    {/* 600 */} {totalPatients}
                                </Typography>
                            </CardContent>
                        </Paper>
                        <Paper className='paper-container'  elevation={3}>
                            <CardContent sx={{display:'flex',flexDirection:'column',rowGap:'2px',alignItems:'flex-start'}}>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',columnGap:10}}>
                                <Avatar sx={{bgcolor:'#f5f5f5',border:'1px solid lightgray'}}>
                                        <NoteAlt sx={{color:'#11b3cf'}}/>
                                    </Avatar>
                                <Typography variant="h6" component="div" fontWeight='bold'>
                                    {/* <Icon sx={{color:'#11B3cf'}} fontSize='small' style={{marginRight:'18px'}}><NoteAlt/></Icon> */}
                                    Ongoing Follow-Ups
                                </Typography>
                                </div>
                                <Typography sx={{color:'#11B3cf'}} fontSize='30px' fontWeight='bold' variant="body2" style={{marginLeft:'17%'}}>
                                    {/* 300 */} {followupStatusOngoing}
                                </Typography>
                            </CardContent>
                        </Paper>
                        <Paper className='paper-container'  elevation={3}>
                            <CardContent sx={{display:'flex',flexDirection:'column',rowGap:'2px',alignItems:'flex-start'}}>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',columnGap:10}}>
                                <Avatar sx={{bgcolor:'#f5f5f5',border:'1px solid lightgray'}}>
                                        <NoteAlt sx={{color:'#11b3cf'}}/>
                                    </Avatar>
                                <Typography variant="h6" component="div" fontWeight='bold'>
                                    {/* <Icon sx={{color:'#11B3cf'}} fontSize='small' style={{marginRight:'18px'}}><NoteAlt/></Icon> */}
                                    Completed Follow-ups
                                </Typography>
                                </div>
                                <Typography sx={{color:'#11B3cf'}} fontSize='30px' fontWeight='bold' variant="body2" style={{marginLeft:'17%'}}>
                                    {followupStatusCompleted}
                                </Typography>
                            </CardContent>
                        </Paper>

                       
                    </div>
                   
                    <div className='heading'>
                    
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card className='heading3'>
                            <CardContent>
                                <Box flexGrow={1} marginLeft={-3}>
                                    <Typography variant='h6' fontWeight='bold' textAlign='center'>Gender-Wise Patient Distribution</Typography>
                                    <PieChart 
                                        colors={palette}
                                        series={[{
                                            arcLabel: (item) => `${item.label}`,
                                            data: [
                                                //{value: 10,label:'male'}
                                               { value: selectedCity==""?genDist.totalMaleCount:genDist.maleCount,label:'Male'},
                                               { value:  selectedCity==""?genDist.totalFemaleCount:genDist.femaleCount,label:'Female'},
                                               
                                                // { value: (genDist['totalMaleCount']) /(genDist['totalMaleCount']+genDist['totalFemaleCount'])*100, label: 'Male' }, 
                                                // { value: (genDist['totalFemaleCount']) /(genDist['totalMaleCount']+genDist['totalFemaleCount'])*100, label: 'Female' },
                                            ] 
                                            // data: [
                                            //     { value: (genDist && genDist.totalMaleCount) ? genDist.totalMaleCount : 0, label: 'Male' }, 
                                            //     { value: (genDist && genDist.totalFemaleCount) ? genDist.totalFemaleCount : 0, label: 'Female' },
                                            // ] 
                                        }]}
                                        
                                        {...pieParams}
                                        width={500}
                                        height={300}
                                    />
                                </Box>
                            </CardContent>      
                        </Card>
                        <Card className='heading3'>
                            <CardContent>
                                <Box flexGrow={1} marginLeft={-3}>
                                    <Typography variant='h6' fontWeight='bold' textAlign='center'>Age-Wise Patient Distribution</Typography>
                                    <PieChart 
                                        colors={palette}
                                        series={[{
                                            arcLabel: (item) => `${item.label}`,
                                            
                                            data: [
                                            //     { value: 10, label: '0-18' }, 
                                            //     { value: 15, label: '19-45'}, 
                                            //     { value: 20, label: '45-100' }
                                            {value:ageDist['61+'],label:'61+'},
                                            {value:ageDist['46-60'],label:'46-60'},
                                            {value:ageDist['31-45'],label:'31-45'},
                                            {value:ageDist['19-30'],label:'19-30'},
                                            {value:ageDist['13-18'],label:'13-18'}
                                            ] 
                                        }]}
                                        
                                        {...pieParams}
                                        width={480}
                                        height={300}
                                    />
                                </Box>
                            </CardContent>      
                        </Card>

                        <Card className='heading3'>
                        <CardContent>
                            <Box flexGrow={1} marginLeft={-3}>
                                <Typography variant='h6' fontWeight='bold' textAlign='center'>Top 10 ICD Codes</Typography>
                                <PieChart 
                                    colors={palette}
                                    series={[{
                                        arcLabel: (item) => `${item.label}`,
                                        data:icdData
                                       
                                    }]}
                                    
                                    {...pieParams}
                                    width={480}
                                    height={300}
                                />
                            </Box>
                        </CardContent>      
                    </Card>
                        
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                   
                        <Card className='heading2bar'>
                            <CardContent>
                            <Typography variant='h6' fontWeight='bold' textAlign='center'>Month-wise Patient Data:</Typography>
                             <BarChart
                                    // dataset={wholeMonthData.map(data => ({
                                    //     Citizens: data.Citizens,
                                    //     Patients: data.Patients,
                                    //     Ongoing: data.Ongoing, 
                                    //     Completed: data.Completed, // Assuming the second index is for completed follow-ups
                                    //     month: data.month,
                                    // }))}
                                   //dataset={monthData}
                            //  dataset={wholeMonthData}
                            dataset={selectedCity === "" ? wholeMonthData : monthData}
                                    // dataset={[{
                                    //     Citizens: 80,
                                    //     Patients: 50,
                                    //     Ongoing: 20,
                                    //     Completed: 40,
                                    //     month: 'June',
                                    // }]}
                                    xAxis={[{ scaleType: 'band', dataKey: 'month', label: 'Month' }]}
                                    yAxis={[{ label: 'Patients' }]}
                                    series={[
                                        { dataKey: 'Citizens', label: 'Citizens' },
                                        { dataKey: 'Patients', label: 'Patients' },
                                        { dataKey: 'Ongoing', label: 'Ongoing Follow-Ups' },
                                        { dataKey: 'Completed', label: 'Completed Follow-Ups' },
                                    ]}
                                    width={1400}
                                    height={300}
                                    colors={['#19cfcc', '#05a8fa', '#0054d1', '#081999']}
                                    />                            
                                    
                            </CardContent>
                        </Card>
                  
                    </div>

                    
                    </div>

                    <div >
                        <Card style={{marginLeft:'20px',padding:'20px',marginTop:'20px',maxWidth:'1350px'}}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Overview: District-Wise Details
                                </Typography>
                                <div className='table-container'>
                                    
                                    <div style={{ height: '400px', width: '100%' }}>
                                        
                                    <DataGrid
                                            rows={filteredDataList?.map((item, index) => ({ ...item, index: index + 1 }))}
                                           // rows={data.slice(0, 30)} // Displaying the first 30 rows
                                            columns={columns}
                                            rowClassName={rowStyles}
                                            onRowClick={(params) => handleView(params.row)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                
                    <Card variant='outlined' style={{ margin: '20px', maxWidth: '1450px' , padding: '20px' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Diagnostic Codes and Descriptions
                </Typography>
                <Typography variant="body1">
                    <strong>F20.0:</strong> Used for cases of schizophrenia with predominant delusions or auditory hallucinations.
                </Typography>
                <Typography variant="body1">
                    <strong>F25.0:</strong> Used for cases of schizoaffective disorder where there is a manic or hypomanic episode.
                </Typography>
                <Typography variant="body1">
                    <strong>F44.81:</strong> Used for cases of dissociative identity disorder, characterized by the presence of two or more distinct personality states.
                </Typography>
                <Typography variant="body1">
                    <strong>F63.9:</strong> Used for cases of habit and impulse disorders that are not specified further.
                </Typography>
                <Typography variant="body1">
                    <strong>F45.1:</strong> Used for cases of somatization disorder, where there are multiple physical symptoms without a known medical cause.
                </Typography>
                <Typography variant="body1">
                    <strong>F51.0:</strong> Used for cases of insomnia that are not due to a known organic cause.
                </Typography>
                <Typography variant="body1">
                    <strong>F68.10:</strong> Used for cases of factitious disorder where the symptoms are primarily psychological in nature.
                </Typography>
                <Typography variant="body1">
                    <strong>F32.2:</strong> Used for cases of severe major depressive disorder without psychotic features.
                </Typography>
                <Typography variant="body1">
                    <strong>F64.1:</strong> Used for cases of gender dysphoria in individuals who are adolescents or adults.
                </Typography>
                <Typography variant="body1">
                    <strong>F06.30:</strong> Used for cases of mood disorder that are due to a known medical condition but are not further specified.
                </Typography>
            </CardContent>
        </Card>
                    
                </Paper>                
            </Grid>
          )
           
       
    );
};

export default Dashboard;
