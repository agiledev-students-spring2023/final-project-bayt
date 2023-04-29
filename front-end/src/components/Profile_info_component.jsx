import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import { Container } from '@mui/system';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import DeleteAccountButton from './ProfileDelete';
import axios from 'axios';

const ProfInfo = (props) => {
  const [isEditable, setIsEditable] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [householdRole, setHouseholdRole] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [houses, setHouses] = React.useState([]);
  const username = props.username;

  //axios to get data from backend database
  React.useEffect(() => {
    axios
      .get(`/api/Profile`)
      .then(response => {
        setEmail(response.data.email);
        setHouseholdRole(response.data.role);
        setPhone(response.data.telephone);
        setRooms(response.data.rooms);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const handleEditClick = () => {
    setIsEditable(true);
  };

  //axios to store updated profile info
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
      <Box margin={'auto'} sx={{ width: '70%', maxWidth: '100%' }}>
      <Box margin={'auto'} sx={{ width: '70%', maxWidth: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SentimentSatisfiedAltIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
          <TextField
            fullWidth
            id="firstname"
            label="First Name"
            variant="standard"
            value={firstname}
            disabled={!isEditable}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <InsertEmoticonIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
          <TextField
            fullWidth
            id="lastname"
            label="Last Name"
            variant="standard"
            value={lastname}
            disabled={!isEditable}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
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
          <HomeIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
          <TextField
            fullWidth
            id="houses"
            label="Houses"
            variant="standard"
            value={houses.join(', ')}
            inputProps={{readOnly:true,}}
            disabled={!isEditable}
            onChange={(e) => setRooms(e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginTop: '30px' }}>
          {isEditable ? (<Button variant="contained" sx={{ backgroundColor: '#3D405B', '&:hover': { backgroundColor: '#eaefe9' } }} onClick={handleSaveClick}>Save</Button>) : (<Button variant="contained" sx={{ backgroundColor: '#3D405B', '&:hover': { backgroundColor: '#eaefe9' }, width: '200px' }} onClick={handleEditClick}>Edit</Button>)}
          {isEditable && (
            <>
              <DeleteAccountButton />
            </>
          )}
              <DeleteAccountButton />
            </>
          )}
        </Box>
      </Box>
    </Container>
      </Box>
    </Container>
  );
}

export default ProfInfo;