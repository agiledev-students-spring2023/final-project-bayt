import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import '../css/HouseCodeForm.css';

function HouseCodeForm(props) {
  return (
    <>
      <h1>Create house</h1>

      <Grid container spacing={3} sx={{ mt: 1 }} >
        <Grid item xs={12}>
          <TextField required id="houseName" name="houseName" label="Enter house name" fullWidth />
        </Grid>

        <Grid item xs={12}>
            <TextField required fullWidth name="password" label="Enter house code" type="password" id="password"/>
        </Grid>

        <Grid item xs={12}>
            <TextField required fullWidth name="passwordConfirm" label="Confirm house code" type="password" id="passwordConfirm"/>
        </Grid>

        <Grid className='houseCodePromptContainer' item xs={12}>
            <p className='houseCodePrompt'>All ur roomates can use this house code.</p>
        </Grid>
      </Grid>
    </>
  );
}

export default HouseCodeForm;