import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HouseCodeForm from '../components/HouseCodeForm';
import CreateProfileForm from '../components/CreateProfileForm';
import { useNavigate } from 'react-router-dom';
import "../index.css";
import Alert from '@mui/material/Alert';
import axios from 'axios';

import '../css/Signup.css';

function getStepContent(step, setFormValues,errorMessage) {
  switch (step) {
    case 0:
      return <HouseCodeForm setFormValues={setFormValues} errorMessage={errorMessage}/>;
    case 1:
      return <CreateProfileForm setFormValues={setFormValues} errorMessage={errorMessage}/>;
    default:
      throw new Error('Unknown step');
  }
}


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


const defaultValues = {
  houseName: '',
  password:'',
  passwordConfirm: '',
  username:'',
  email:'',
  role:''
};


export default function Checkout() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = React.useState(defaultValues);
  const [errorMessage, setErrorMessage] = React.useState(''); //finish this part
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    console.log(formValues);
    if ((formValues.houseName.length<1)||(formValues.password.length<1)){
      setErrorMessage(<Alert severity="error">{`Please fill out all fields`}</Alert>);
    }
    else if (formValues.passwordConfirm!==formValues.password){
      setErrorMessage(<Alert severity="error">{`Passwords do not match`}</Alert>);
    }
    else{
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNavigate = () => {
    return navigate(-1);
  }

  const handleFinish = () => {
    // Make post request here with houseCodeData and profileData
    console.log(formValues);
    if ((formValues.username.length<1)||(formValues.email.length<1)||(formValues.role.length<1)){
      setErrorMessage(<Alert severity="error">{`Please fill out all fields`}</Alert>);
    }
    else{
      axios
      .post(`/api/signup/`, formValues)
      .then((res) => {
          navigate('/home');
      })
      .catch((err) => {
          console.error(err);
        })
  };
};

  return (
    <div className='signupPageContainer'>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            {
              <>
                {getStepContent(activeStep, setFormValues,errorMessage)}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 7 }}>
                  {activeStep !== 0 ? (<button onClick={handleBack}>Back</button>) : (<button onClick={handleNavigate} >Back</button>)}
                  {activeStep !== 1 ? (<button onClick={handleNext}>Next</button>) : (<button onClick={handleFinish} >Finish</button>)}
                </Box>
  
              </>
            }
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
} 