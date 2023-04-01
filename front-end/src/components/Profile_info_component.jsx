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

export default function ProfInfo() {
  const [isEditable, setIsEditable] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [householdRole, setHouseholdRole] = React.useState('Admin');
  const [housecode, setHousecode] = React.useState('whatever');
  const [phone, setPhone] = React.useState('444-444-4444');
  const [rooms, setRooms] = React.useState('Kitchen');


  

    const fetchData = async () => {
        try {
            console.log('fetching data');
        const response = await axios.get("back-end/HardCode.json");
        const data = response.data[0]; // assuming the file contains only one object
        // set the data in the state variables
        setUsername(data.username);
        setHouseholdRole(data.role);
        setPhone(data.telephone);
        setRooms(data.rooms);
        } catch (error) {
        console.log(error);
        }
    };
  
    
    React.useEffect(() => {
        fetchData();
      }, []);


  const handleEditClick = () => {
    setIsEditable(true);
  
  };

  const handleSaveClick = () => {
    setIsEditable(false);
   //send and save to back end database whatever kms


  };

  return (
    <Container maxWidth='lg'>
      <Box margin={'auto'} sx={{ width: '70%', maxWidth:'100%'}}>     
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
          <TextField
            fullWidth
            id="username"
            label="Username or Email"
            variant="standard"
            value={username}
            disabled={!isEditable}
            onChange={(e) => setUsername(e.target.value)}
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
            {isEditable ? (<Button variant="contained" sx={{ backgroundColor: '#6e9884', '&:hover': { backgroundColor: '#3D405B' }  }} onClick={handleSaveClick}>Save</Button>):(<Button variant="contained" sx={{ backgroundColor: '#6e9884', '&:hover': { backgroundColor: '#3D405B' }, width: '150px' }} onClick={handleEditClick}>Edit</Button>)}
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