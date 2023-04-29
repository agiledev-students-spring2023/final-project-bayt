import React, { useState, useEffect } from "react";
import '../css/AddMember.css'
import AddMembersPic from "../components/AddMemberPic.jsx";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import { useNavigate, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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

    const [age, setAge] = React.useState('');
    const [loggeduser, setLoggedUser] = React.useState('');
    const [userData, setUserData] = useState({});

    const handleImageClick = (field, value) => {
        // const newFormData = new FormData();
        // newFormData.append(field, value);
        // setFormData(newFormData);
        setUserData({ [field]: value, ...userData });
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
    }, []);

    const handleChange = (evt) => {
        setAge(evt.target.value);
    };

    const navigate = useNavigate();
    //change this to navigate back to most prev page (probs settings op)
    const handleFinish = () => {
        // formData.append('username',document.getElementById('username').value);
        // formData.append('email',document.getElementById('email').value);
        // formData.append('role',age);
        /*for (const value of formData.values()) {
            console.log(value);
          }*/
        let req = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            role: age,
            ...userData,
        };
        // formData.forEach((value, key) => req[key] = value);
        // console.log('req', req);
        axios.post(`/api/addMembers/${loggeduser}`, req)
            // axios.post(`/api/addMembers/${loggeduser}`, formData)
            .then(response => {
                console.log(response);
                navigate('/home');
            })
            .catch(error => {
                // Handle errors
                console.log(error.response.data);
                console.log("not getting through")
            });


        return navigate('/home');
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
                                <h1 className="text" sx={{ mb: 4 }}  >Add Family Member</h1>
                                <AddMembersPic onImageClick={handleImageClick} />
                                <Grid container spacing={3} sx={{ mt: 1 }} >
                                    <Grid item xs={12}>
                                        <TextField required id="username" name="username" label="Enter roomate username" fullWidth />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField required fullWidth id="email" label="Enter roomate email address" name="email" />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="role-select-label">Role</InputLabel>
                                            <Select labelId="role-select-label" id="role-select" value={age} label="Role" onChange={handleChange}>
                                                <MenuItem value={'admin'}>Admin</MenuItem>
                                                <MenuItem value={'roomate'}>Roomate</MenuItem>
                                            </Select>
                                        </FormControl>
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
