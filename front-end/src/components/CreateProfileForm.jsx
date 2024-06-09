import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../index.css'

import '../css/CreateProfileForm.css';

function CreateProfileForm(props) {
    const [role, setRole] = React.useState('');
    const { formValues, setFormValues, errorMessage } = props;

    const handleChange = (evt) => {
        setRole(evt.target.value);
        setFormValues((prevFormValues) => Object.assign({}, prevFormValues, { 
            role: evt.target.value
          }));
    };

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setFormValues((prevFormValues) => Object.assign({}, prevFormValues, { 
        [name]: value,
        }));
    }

    return (
        <>
        
        <h1>Create your profile</h1>
        {errorMessage}
        <Grid container spacing={3} sx={{ mt: 1 }} >
            <Grid item xs={12}>
                <TextField required value={formValues.username} id="username" name="username" label="Enter username" fullWidth onChange={handleInputChange} />
            </Grid>

            <Grid item xs={12}>
                <TextField required value={formValues.email} fullWidth id="email" label="Enter email address" name="email" onChange={handleInputChange}/>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select labelId="role-select-label" id="role-select" value={role === '' ? formValues.role : role} label="Role"  onChange={handleChange}>
                        <MenuItem  value={'admin'}>Admin</MenuItem>
                        <MenuItem  value={'roomate'}>Roomate</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <p className='createProfilePromptHidden'>hidden</p>
            </Grid>
            
        </Grid>
        
        </>
    );
}

export default CreateProfileForm;