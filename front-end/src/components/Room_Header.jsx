import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

	const handleClick = () => {
		return navigate(-1);
	}

    return (
        <Box className="header">
            <Grid container sx={{ alignItems: 'center', color: '#fff' }}>
                <Grid item xs={2} sx={{ p: 1, textAlign: 'left' }}>
                    <ArrowBackIosNewTwoToneIcon onClick={handleClick} sx={{color: '#fff', backgroundColor: '#3d405b', borderRadius: '0.4rem' }} style={{fontSize: '3rem'}} ></ArrowBackIosNewTwoToneIcon>
                </Grid>

                <Grid item xs={8} sx={{ textAlign: 'center' }}>
                    <h3>{props.room ? separateWords(props.room) : 'Default Room'}</h3>
                </Grid>
            </Grid>
        </Box>
    )
}

export default RoomHeader;