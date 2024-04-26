import { NoteAlt } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import React from 'react';
import './dashboard.css';
const pieParams = { height: 200, margin: { right: 5 } };
const palette = ['#19cfcc', '#05a8fa', '#0054d1'];
const Dashboard = () => {
    return (
        
            <Grid container className="container">   
           
                <Paper variant='outlined' elevation={5} sx={{flexDirection:'column',rowGap:'100px',backgroundColor:'#fafafa'}} >
                <Card  className='title' variant='outlined' elevation={0}  style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                     <Typography variant="h2" vartextAlign='center' component="div" >HealthCare Dashboard</Typography>
                 </Card>
                    <div className='card'>
                        <Paper className='paper-container'  elevation={3}>
                            <CardContent sx={{display:'flex',flexDirection:'column',rowGap:'2px',alignItems:'flex-start'}}>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',columnGap:10}}>
                                <Avatar sx={{bgcolor:'#f5f5f5',border:'1px solid lightgray'}}>
                                        <NoteAlt sx={{color:'#11b3cf'}}/>
                                    </Avatar>
                                <Typography variant="h6" component="div" fontWeight='bold'>
                                    {/* <Icon sx={{color:'#11B3cf'}} fontSize='small' style={{marginRight:'18px'}}><NoteAlt/></Icon> */}
                                    Citizens
                                </Typography>
                                </div>
                                <Typography sx={{color:'#11B3cf'}} fontSize='30px' fontWeight='bold' variant="body2" style={{marginLeft:'17%'}}>
                                    1000
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
                                    600
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
                                    300
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
                                    Citizens
                                </Typography>
                                </div>
                                <Typography sx={{color:'#11B3cf'}} fontSize='30px' fontWeight='bold' variant="body2" style={{marginLeft:'17%'}}>
                                    1000
                                </Typography>
                            </CardContent>
                        </Paper>

                       
                    </div>
                   
                    <div className='heading'>
                    <div >
                    <Typography variant="h6" component="div" sx={{marginLeft:'60px', marginBottom: '10px'}}></Typography>
                    </div> 
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                   
                        <Card className='heading2'>
                            <CardContent>
                            <Typography variant='h6' fontWeight='bold' textAlign='center'>Month-wise Patient Data</Typography>
                            {/* <LineChart
                                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                                width={700}
                                height={250}
                            /> */}
                            <BarChart
                                dataset={[
                                    {
                                        Citizens: 80,
                                        Patients: 50,
                                        Ongoing: 20,
                                        Completed: 40,
                                        month: 'June',
                                    },
                                    {
                                        Citizens: 70,
                                        Patients: 60,
                                        Ongoing: 30,
                                        Completed: 50,
                                        month: 'July',
                                    },
                                    {
                                        Citizens: 90,
                                        Patients: 40,
                                        Ongoing: 25,
                                        Completed: 45,
                                        month: 'August',
                                    },
                                    {
                                        Citizens: 85,
                                        Patients: 45,
                                        Ongoing: 15,
                                        Completed: 55,
                                        month: 'September',
                                    },
                                    {
                                        Citizens: 75,
                                        Patients: 55,
                                        Ongoing: 35,
                                        Completed: 60,
                                        month: 'October',
                                    }
                                ]}
                                xAxis={[{ scaleType: 'band', dataKey: 'month',label:'Month' }]}
                                yAxis={[{label:'Patients'}]}
                                series={[
                                    { dataKey: 'Citizens', label: 'Citizens' },
                                    { dataKey: 'Patients', label: 'Patients' },
                                    { dataKey: 'Ongoing', label: 'Ongoing-Follow-Ups' },
                                    { dataKey: 'Completed', label: 'Completed-Follow-Ups' },
                                ]}
                                width={700}
                                height={300}
                                colors={['#19cfcc', '#05a8fa', '#0054d1','#081999']}
                                />
                            </CardContent>
                        </Card>

                        <Card className='heading3'>
                            <CardContent>
                                <Box flexGrow={1}>
                                    <Typography variant='h6' fontWeight='bold' textAlign='center'>Age-wise Patient Distribution</Typography>
                                    <PieChart 
                                        colors={palette}
                                        series={[{
                                            arcLabel: (item) => `${item.label}`,
                                            data: [
                                                { value: 10, label: '0-18' }, 
                                                { value: 15, label: '19-45'}, 
                                                { value: 20, label: '45-100' }
                                            ] 
                                        }]}
                                        
                                        {...pieParams}
                                        width={460}
                                        height={250}
                                    />
                                </Box>
                            </CardContent>      
                        </Card>
                    </div>
                    </div>
                   

                    
                </Paper>                
            </Grid>
       
    );
};

export default Dashboard;
