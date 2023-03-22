// Login Page

import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

import logo from '../logo.png'
import "../index.css";
import "../css/Login.css";

// TODOS:
// 1. Have error message appear in p tag if receive 400s or 500s from backend.
// 2. Username input field retains the value user just entered if something went wrong (backend issues, wrong housecode, etc.).

const theme = createTheme({
    palette: {
      primary: {
        main: '#81b29a',
        contrastText: '#fff',
      },
      secondary: {
        main: '#81b29a',
        contrastText: '#fff',
      },
    },
});

function Login(props) {
    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // const data = new FormData(evt.currentTarget);
        // console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
        // });
        navigate('/home');
    };

    return (
<<<<<<< HEAD
        <div className='loginPageContainer'>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                        <h1>Login</h1>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"/>

                            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password"/>

                            <Button type="submit" color='primary' fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Log In</Button>

                            <Grid container>
                                <Grid item xs={9}></Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        Create House
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
=======
        <div id='outer'>
            <div className='logoContainer'>
                <div className='logo'>
                <img src={logo} className="logo" alt="logo" />
                </div>
            </div>

            <div className='inputArea'>
                <div className='loginArea'>
                    <input id='usernameInput' type="text" name='username' placeholder='USERNAME'/>
                    <input id='passwordInput' type="password" name='housecode' placeholder='HOUSE CODE' />
                    <input onClick={handleClick} id='loginBtn' type="submit" value='Login' />
                </div>

                <div className='signupArea'>
                    <button id='signupBtn'>Sign Up</button>
                </div>
            </div>

            <footer className='loginFooter'>
                <h5>© 2023 Bayt</h5>
            </footer>
>>>>>>> origin
        </div>
    );
}

export default Login;