import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import AddressForm from './AddressForm';
// import PaymentForm from './PaymentForm';
// import Review from './Review';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  // switch (step) {
  //   case 0:
  //     return <AddressForm />;
  //   case 1:
  //     return <PaymentForm />;
  //   case 2:
  //     return <Review />;
  //   default:
  //     throw new Error('Unknown step');
  // }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <h1>Sign Up</h1>
          {activeStep === steps.length ? (<h1>Thank you</h1>) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>Back</Button>)}
              <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
            </Box>
          </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}