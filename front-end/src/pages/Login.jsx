// Login Page

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "../index.css";
import "../css/Login.css";

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
    const [urlSearchParams] = useSearchParams();

    const [formValues, setFormValues] = useState(defaultValues);
    const [errorMessage, setErrorMessage] = useState('');
    const [response, setResponse] = useState({}) // set JWT token, if the user logs in successfully

    useEffect(() => {
        const qsError = urlSearchParams.get("error");
        if (qsError === "protected")
            setErrorMessage(<Alert severity="error">Please log in to view our pages.</Alert>);
    }, []);

    useEffect(() => {
        // if the user is logged-in, save the token to local storage
        if (response.success && response.token) {
            localStorage.setItem("token", response.token); // store the token into localStorage
        }
    }, [response]);

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const response = await axios.post(backend_route, formValues);
            setErrorMessage('');
            setResponse(response.data);
        } catch(err) {
            setErrorMessage(<Alert severity="error">{`${err.response.data.message}`}</Alert>);
        }
    };

    if (!response.success) {
        return (
            <div className='loginPageContainer'>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                            <h1>Login</h1>
    
                            {errorMessage}
    
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField margin="normal" required fullWidth id="username" label="Username" name="username" onChange={handleInputChange}/>
    
                                <TextField margin="normal" required fullWidth name="password" label="House Code" type="password" id="password" onChange={handleInputChange}/>
    
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
    else return <Navigate to="/home" />
}

export default Login;