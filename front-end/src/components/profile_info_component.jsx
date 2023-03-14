import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import { Container } from '@mui/system';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';


export default function ProfInfo() {
  return (
    <Container maxWidth='lg'>
    <Box margin={'auto'} sx={{ width: '20%'}}>     
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EmailIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField id="input-with-sx" label="Input Email" variant="standard" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Diversity3Icon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField id="input-with-sx" label="Household Role" variant="standard" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <LockIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
            />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PhoneIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField id="input-with-sx" label="xxx-xxx-xxxx" variant="standard" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <HomeIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField id="input-with-sx" label="rooms" variant="standard" />
        </Box>
        </Box>
        </Container>
    
  );
}
