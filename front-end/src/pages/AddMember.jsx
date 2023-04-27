import React, { useState, useEffect } from "react";
import '../css/AddMember.css'
import AddMembersPic from "../components/AddMemberPic.jsx";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useNavigate, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";


//stole a lot of code from zanders page 
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


    function AddMembers() {
        const jwtToken = localStorage.getItem("token");

        const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
        const [errorMessage, setErrorMessage] = useState('');
        const [loggeduser,setLoggedUser] = React.useState('');
        const [userData, setUserData] = useState({});

        const handleImageClick = (field, value) => {
            setUserData( { [field]: value, ...userData} );
        };

        useEffect(() => {
            // send the request to the server api, including the Authorization header with our JWT token in it
            axios
            .get('/api/protected/addmembers', {
                headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
            })
            .then(res => {
                setLoggedUser(res.data.user.username);
            })
            .catch(err => {
                setIsLoggedIn(false); // update this state variable, so the component re-renders
            });
        }, [/*errorMessage*/]);


        const navigate = useNavigate();
        //change this to navigate back to most prev page (probs settings op)
        const handleFinish = async () => {

            let req = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                ...userData,
            };

            try {
                const response = await axios.post(`/api/addMembers/${loggeduser}`,req);
                setErrorMessage('');
                console.log(response)
                navigate('/home');

              } catch(err) {
                setErrorMessage(<Alert severity="error">{`${err.response.data.message}`}</Alert>);
              }
        }

        const handleCancel = () => {
            return navigate('/Settings');
        }

        return (
            <>
                {isLoggedIn ? (
                    <div className="addMembersContainer">
                    <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <h1 className="text" sx={{mb: 4}}  >Add Family Member</h1>
                            <AddMembersPic onImageClick={handleImageClick} />

                            {errorMessage}

                            <Grid container spacing={3} sx={{ mt: 1 }} >
                                <Grid item xs={12}>
                                    <TextField required id="username" name="username" label="Enter roomate username" fullWidth />
                                </Grid>
        
                                <Grid item xs={12}>
                                    <TextField required fullWidth id="email" label="Enter roomate email address" name="email"/>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField required fullWidth id="password" label="Enter shared housecode" name="password"/>
                                </Grid>

                            
                            </Grid>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 7 }}>
                                <Button fullWidth variant="contained" onClick={handleCancel} sx={{ mt: 3 }}>Cancel</Button>
                                <Button fullWidth variant="contained" onClick={handleFinish} sx={{ mt: 3, ml: 2 }}>Finish</Button>
                            </Box>
                        </Box>
                        </Container>
                        </ThemeProvider> 
                    </div>
                ) : (
                <Navigate to='/login?error=protected' />
                )}
            </>
        )
        };

    export default AddMembers;
