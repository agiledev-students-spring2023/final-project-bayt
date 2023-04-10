import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import '../css/HouseCodeForm.css';



function HouseCodeForm(props) {

  const {setFormValues,errorMessage} = props;

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues((prevFormValues) => Object.assign({}, prevFormValues, { 
      [name]: value,
    }));

};

  return (
    <>
      <h1>Create house</h1>
      {errorMessage}
      <Grid container spacing={3} sx={{ mt: 1 }} >
        <Grid item xs={12}>
          <TextField required id="houseName" name="houseName" label="Enter house name" fullWidth onChange={handleInputChange} />
        </Grid>

        <Grid item xs={12}>
            <TextField required fullWidth name="password" label="Enter house code" type="password" id="password" onChange={handleInputChange}/>
        </Grid>

        <Grid item xs={12}>
            <TextField required fullWidth name="passwordConfirm" label="Confirm house code" type="password" id="passwordConfirm" onChange={handleInputChange}/>
        </Grid>

        <Grid className='houseCodePromptContainer' item xs={12}>
            <p className='houseCodePrompt'>All your roomates can use this house code.</p>
        </Grid>
      </Grid>
    </>
  );
}

export default HouseCodeForm;