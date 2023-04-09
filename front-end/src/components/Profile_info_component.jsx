import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import { Container } from '@mui/system';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import DeleteAccountButton from './ProfileDelete';
import axios from 'axios';

const ProfInfo = () => {
  const [isEditable, setIsEditable] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [householdRole, setHouseholdRole] = React.useState('');
  const [housecode, setHousecode] = React.useState("password");
  const [phone, setPhone] = React.useState('');
  const [rooms, setRooms] = React.useState('');



  //axios to get data fetched by backend
  React.useEffect(() => {
      axios
          .get(`/api/Profile`)
          .then(response => {
              setEmail(response.data.email);
              setHouseholdRole(response.data.role);
              setPhone(response.data.telephone);
              setRooms(response.data.rooms);
          })
      .catch (err => {
      console.log(err);
      })
  }, [])
  


  const handleEditClick = () => {
    setIsEditable(true);
  };

  

  const handleSaveClick = () => {
    setIsEditable(false);
   //axios to update data in backend
    axios
    .put(`/api/Profile`, {
      email,
      role: householdRole,
      password: housecode,
      telephone: phone,
      rooms
    })

    //this needs to be updated to reflect data recieved from database
    .then(response => {
      console.log(response);
      // Update the state variables with the updated data from the response
      //rn it doesnt actually do shit as we are using json file in backend and browser ignores updated values until new session
      setEmail(response.data.email);
      setHouseholdRole(response.data.role);
      setPhone(response.data.telephone);
      setRooms(response.data.rooms);
    })

    .catch(error => {
      console.log(error);
    });
  };



  return (
    <Container maxWidth='lg'>
      <Box margin={'auto'} sx={{ width: '70%', maxWidth:'100%'}}>     
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
          <TextField
            fullWidth
            id="username"
            label="Email"
            variant="standard"
            value={email}
            disabled={!isEditable}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Diversity3Icon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
          <TextField
            fullWidth
            id="householdRole"
            label="Household Role"
            variant="standard"
            value={householdRole}
            disabled={!isEditable}
            onChange={(e) => setHouseholdRole(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <LockIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
          <TextField
            fullWidth
            id="housecode"
            label="Housecode"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={housecode}
            disabled={!isEditable}
            onChange={(e) => setHousecode(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <PhoneIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
          <TextField
            fullWidth
            id="phone"
            label="xxx-xxx-xxxx"
            variant="standard"
            value={phone}
            disabled={!isEditable}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <HomeIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
          <TextField
            fullWidth
            id="rooms"
            label="Rooms"
            variant="standard"
            value={rooms}
            disabled={!isEditable}
            onChange={(e) => setRooms(e.target.value)}
            />
        </Box>
       
        <Box sx={{ display: 'flex', alignItems: 'center',flexDirection: 'column', justifyContent:'center', marginTop: '30px' }}>
            {isEditable ? (<Button variant="contained" sx={{ backgroundColor: '#3D405B', '&:hover': { backgroundColor: '#eaefe9' }  }} onClick={handleSaveClick}>Save</Button>):(<Button variant="contained" sx={{ backgroundColor: '#3D405B', '&:hover': { backgroundColor: '#eaefe9' }, width: '200px' }} onClick={handleEditClick}>Edit</Button>)}
            {isEditable && (
            <>
            <DeleteAccountButton/>
            </> 
            )}
        </Box>
        </Box>
        </Container>
  );
}

export default ProfInfo;