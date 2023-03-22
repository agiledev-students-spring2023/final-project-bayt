import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HouseCodeForm from '../components/HouseCodeForm';
import CreateProfileForm from '../components/CreateProfileForm';
import { useNavigate } from 'react-router-dom';

import '../css/Signup.css';

function getStepContent(step) {
  switch (step) {
    case 0:
      return <HouseCodeForm />;
    case 1:
      return <CreateProfileForm />;
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

export default function Checkout() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNavigate = () => {
    return navigate(-1);
  }

  const handleFinish = () => {
    return navigate('/home');
  }

  return (
    <div className='signupPageContainer'>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            {
              <>
                {getStepContent(activeStep)}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 7 }}>
                  {activeStep !== 0 ? (<Button fullWidth variant="contained" onClick={handleBack} sx={{ mt: 3 }}>Back</Button>) : (<Button fullWidth variant="contained" onClick={handleNavigate} sx={{ mt: 3 }}>Back</Button>)}
                  {activeStep !== 1 ? (<Button fullWidth variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 2 }}>Next</Button>) : (<Button fullWidth variant="contained" onClick={handleFinish} sx={{ mt: 3, ml: 2 }}>Finish</Button>)}
                </Box>
              </>
            }
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}