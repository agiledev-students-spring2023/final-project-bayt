import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

import '../css/Welcome.css';
import {ReactComponent as Logo} from '../logo.svg';

const theme = createTheme({
    palette: {
      primary: {
        main: '#3d405b',
        contrastText: '#fff',
      },
      secondary: {
        main: '#81b29a',
        contrastText: '#fff',
      },
    },
});

function Welcome(props) {
    const navigate = useNavigate();

    const handleClick = (evt) => {
        evt.preventDefault();
        // const data = new FormData(evt.currentTarget);
        // console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
        // });
        navigate(`/${evt.target.id}`);
    };

    return (
        <div className='welcomePageContainer'>
            <Container maxWidth="sm">
                <Box sx={{ height: '100vh' }}>
                    <Box className='welcomeLogoContainer' sx={{ boxSizing: 'border-box', pt: 10, height: '60%'}}>
                        <Logo className='welcomeLogo'/>
                    </Box>

                    <Box sx={{ boxSizing: 'border-box', px: 4, pt: 2, height: '40%' }}>
                        <Stack spacing={3} direction="column">
                            <ThemeProvider theme={theme}>
                                <Button id='signup' onClick={handleClick} size="large" variant="outlined" style={{ border: '1.4px solid' }} sx={{ borderRadius: '2px' }} color="primary" >Create house</Button>
                                <Button id='login' onClick={handleClick} size="large" variant="outlined" style={{ border: '1.4px solid' }} sx={{ borderRadius: '2px' }} color="secondary" >Log in</Button>
                            </ThemeProvider>
                        </Stack>
                    </Box>

                </Box>
            </Container>
        </div>
    )
}

export default Welcome;