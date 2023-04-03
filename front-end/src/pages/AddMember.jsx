import React from "react";
import '../css/AddMember.css'
import ProfilePic from "../components/Profile_pic_component";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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


function AddMembers(props) {

    const navigate = useNavigate();

    //change this to navigate back to most prev page (probs settings op)
    const handleFinish = () => {
    return navigate('/home');
    }

    const handleCancel = () => {
        return navigate('/Settings');
    }

    return (

     <div className="addMembersContainer">
         <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <h1 className="text" sx={{mb: 4}}  >Add Family Member</h1>
                <ProfilePic />
                <Grid container spacing={3} sx={{ mt: 1 }} >
                    <Grid item xs={12}>
                        <TextField required id="username" name="username" label="Enter roomate username" fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField required fullWidth id="email" label="Enter roomate email address" name="email"/>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="role-select-label">Role</InputLabel>
                            <Select labelId="role-select-label" id="role-select" label="Role">
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
    )
    };

export default AddMembers;
