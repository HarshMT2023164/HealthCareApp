import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import data from '../../utils/constants/RoleCounts';
import { Link } from 'react-router-dom';


export default function RoleCards() {
  const {role} = useParams();
  return (
    <Grid container columnSpacing={5} rowSpacing={5} width={'70vw'} margin={'0 auto'}>
      {data.map((elem) => (
        <Grid item key={elem.role} xs={12} md={6}>
          <Card style={{height:'30vh',width:'30vw'}} elevation={5} >  
          <Link to={"/admin/viewList/" + elem.role} className="link-tag">
            <CardContent className='admin-cardcontent'>
              <div className='admin-cardcontent-items'>
              <h2>{elem.display_name}</h2>
              <h2>{elem.count}</h2>
              </div>
              <div className='admin-cardcontent-items'>
              <img src={elem.icon} alt="nothing" width={'100%'} height={'100%'}></img>
              </div>
            </CardContent>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
