// Login Page

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const backend_route =`/api/login/`;

const defaultValues = {
    username: '',
    password: '',
};

function Login(props) {
    const [formValues, setFormValues] = useState(defaultValues);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        axios
            .post(backend_route, formValues)
            .then((res) => {
                setErrorMessage('');
                navigate('/home');
            })
            .catch((err) => {
                setErrorMessage(<Alert severity="error">{`${err.response.data.message}`}</Alert>);
        });
    };

    return (
        <div className='loginPageContainer'>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                        <h1>Login</h1>

                        {errorMessage}

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="username" label="Username" name="username" onChange={handleInputChange}/>

                            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" onChange={handleInputChange}/>

                            <button type="submit" >Log In</button>

                            <Grid container>
                                <Grid item xs={9}></Grid>
                                <Grid item>
                                    <Link href="/signup" color="#225095" variant="body2">
                                        Create House
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default Login;