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
    <Box margin={'auto'} sx={{ width: '70%', maxWidth:'100%'}}>     
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EmailIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField fullWidth id="input-with-sx" label="Username or Email" variant="standard" defaultValue={"rufus123"} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Diversity3Icon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField fullWidth id="input-with-sx" label="Household Role" variant="standard" value={"Admin"} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <LockIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField fullWidth
                id="standard-password-input"
                label="Housecode"
                type="password"
                autoComplete="current-password"
                variant="standard"
                value={"whatever"}
            />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PhoneIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField fullWidth id="input-with-sx" label="xxx-xxx-xxxx" variant="standard" defaultvalue={'444-444-4444'} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <HomeIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
            <TextField fullWidth id="input-with-sx" label="rooms" variant="standard" value={"Kitchen"} />
        </Box>
        </Box>
        </Container>
    
  );
}
