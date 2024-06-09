import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HouseCodeForm from '../components/HouseCodeForm';
import CreateProfileForm from '../components/CreateProfileForm';
import { useNavigate, Navigate } from 'react-router-dom';
import "../index.css";
import Alert from '@mui/material/Alert';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import '../css/Signup.css';

function getStepContent(step, formValues, setFormValues, errorMessage) {
  switch (step) {
    case 0:
      return <HouseCodeForm formValues={formValues} setFormValues={setFormValues} errorMessage={errorMessage} />;
    case 1:
      return <CreateProfileForm formValues={formValues} setFormValues={setFormValues} errorMessage={errorMessage} />;
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
  password: '',
  passwordConfirm: '',
  username: '',
  email: '',
  role: ''
};


export default function Checkout() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(defaultValues);
  const [errorMessage, setErrorMessage] = useState(''); //finish this part
  const [response, setResponse] = useState({}) // set JWT token, if the user logs in successfully
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // if the user is logged-in, save the token to local storage
    if (response.success && response.token) {
      localStorage.setItem("token", response.token); // store the token into localStorage
      // Decode information in jwt token and store in localStorage
      const decoded = jwt_decode(response.token);

      // For each element, stringify its key and store its value in localStorage
      Object.keys(decoded).forEach(key => {
        localStorage.setItem(key, decoded[key]); // Store stuff like user_id, house_id, etc.
      });
    }
  }, [response]);

  const handleNext = () => {
    if ((formValues.houseName.length < 1) || (formValues.password.length < 1)) {
      setErrorMessage(<Alert severity="error">{`Please fill out all fields`}</Alert>);
    }
    else if (formValues.passwordConfirm !== formValues.password) {
      setErrorMessage(<Alert severity="error">{`Passwords do not match`}</Alert>);
    }
    else {
      setErrorMessage('');
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNavigate = () => {
    return navigate(-1);
  }

  const handleFinish = async () => {
    if ((formValues.username.length < 1) || (formValues.email.length < 1) || (formValues.role.length < 1)) {
      setErrorMessage(<Alert severity="error">{`Please fill out all fields`}</Alert>);
    }
    else {
      try {
        const response = await axios.post(`/api/signup/`, formValues);
        setErrorMessage('');
        setResponse(response.data);
      } catch (err) {
        setErrorMessage(<Alert severity="error">{`${err.response.data.message}`}</Alert>);
      }
    };
  };

  if (!response.success) {
    return (
      <div className='signupPageContainer'>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
              {
                <>
                  {getStepContent(activeStep, formValues, setFormValues, errorMessage)}
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
  else return <Navigate to="/home" />
} 