import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';

const separateWords = str => {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      let char = str.charAt(i);
      if (char === char.toUpperCase()) {
        newStr += " " + char;
      } else {
        newStr += char;
      }
    }

    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
};

function RoomHeader(props) {
    return (
        <Box sx={{ position: 'fixed', left: '0', top: '0', zIndex: '1', width: '100%' }}>
            <Grid container sx={{ alignItems: 'center', backgroundColor: '#f2cc8f' }}>
                <Grid item xs={2} sx={{ p: 1, textAlign: 'left' }}>
                    <ArrowBackIosNewTwoToneIcon sx={{color: '#fff', backgroundColor: '#3d405b', borderRadius: '0.4rem' }} style={{fontSize: '3rem'}} ></ArrowBackIosNewTwoToneIcon>
                </Grid>

                <Grid item xs={8} sx={{ textAlign: 'center' }}>
                    <h3>{props.room ? separateWords(props.room) : 'Default Room'}</h3>
                </Grid>
            </Grid>
        </Box>
    )
}

export default RoomHeader;