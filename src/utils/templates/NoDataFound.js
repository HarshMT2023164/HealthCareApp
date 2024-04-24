// src/components/NoDataFoundMessage.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { SentimentVeryDissatisfied } from '@mui/icons-material';

const NoDataFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        color: 'gray',
      }}
    >
      <SentimentVeryDissatisfied sx={{ fontSize: 80 }} />
      <Typography variant="h5" sx={{ mt: 3 }}>
        No Data Found
      </Typography>
    </Box>
  );
};

export default NoDataFound;
