import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HouseCodeForm from '../components/HouseCodeForm';
import CreateProfileForm from '../components/CreateProfileForm';
import { useNavigate } from 'react-router-dom';
import "../index.css";
import axios from 'axios';

import '../css/Signup.css';

function getStepContent(step, handleHouseCodeData, handleProfileData) {
  switch (step) {
    case 0:
      return <HouseCodeForm handleHouseCodeData={handleHouseCodeData} />;
    case 1:
      return <CreateProfileForm handleProfileData={handleProfileData} />;
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

  const [houseCodeData, setHouseCodeData] = React.useState({});
  const [profileData, setProfileData] = React.useState({});
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

  const handleFinish = async() => {
    // Make post request here with houseCodeData and profileData
    try {
      const response = await axios.post('/signup', {
        houseCodeData: houseCodeData,
        profileData: profileData
      });
      console.log(response.data);
      navigate('/home');
    } 
    catch (error) {
      console.log(error);
    }
  }

  const handleHouseCodeData = (data) => {
    setHouseCodeData(data);
  }

  const handleProfileData = (data) => {
    setProfileData(data);
  }

  return (
    <div className='signupPageContainer'>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            {
              <>
                {getStepContent(activeStep, handleHouseCodeData, handleProfileData)}
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