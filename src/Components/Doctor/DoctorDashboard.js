import { Grid, Paper, Typography } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import React from 'react';

const DoctorDashboard = () => {
  return (
    <div style={{ margin: '5% auto', maxWidth: '1200px'}}>
      <div style={{ marginBottom: '40px' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', color: '#333' }}>
          Screening Statistics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6">Total Screenings</Typography>
              <Typography variant="h4" style={{ color: '#009688' }}>100</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6">Total Patients</Typography>
              <Typography variant="h4" style={{ color: '#009688' }}>50</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6">Detected with Condition</Typography>
              <Typography variant="h4" style={{ color: '#009688' }}>30</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6">Undergoing Treatment</Typography>
              <Typography variant="h4" style={{ color: '#009688' }}>10</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div>
        <Typography variant="h4" style={{ marginBottom: '20px', color: '#333' }}>
          Statistical Analysis
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6" style={{ marginBottom: '20px' }}>Bar Chart</Typography>
              <div style={{ height: '300px' }}>
                <BarChart
                  series={[
                    { data: [35, 44, 24, 34] },
                    { data: [51, 6, 49, 30] },
                    { data: [15, 25, 30, 50] },
                    { data: [60, 50, 15, 25] },
                  ]}
                  height={300}
                  xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6" style={{ marginBottom: '20px' }}>Pie Chart</Typography>
              <div style={{ height: '300px' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 20, label: 'Teenagers' },
                        { id: 1, value: 50, label: 'Adults' },
                        { id: 2, value: 30, label: 'Senior Citizens' },
                      ],
                    },
                  ]}
                  width={400}
                  height={300}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DoctorDashboard;
