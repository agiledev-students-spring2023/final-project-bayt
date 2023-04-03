import React from "react";
import "../css/Home.css";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6B8E23',
      contrastText: '#fff',
    },
  },
});

const Home = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Header title="Home" />
      <div>
        <div className="homeBody">
          <Link to="/tasks">
            <button className="roomButton" type="button">
              Living Room
            </button>
          </Link>
          
          <Link to="/tasks">
            <button className="roomButton" type="button">
              Bathroom
            </button>
          </Link>

          <button className="roomButton" type="button" onClick={handleClickOpen}>
            Add Room
          </button>

          <ThemeProvider theme={theme}>
            <Dialog maxWidth='xs'open={open} onClose={handleClose}>
              <DialogTitle>Add Your Room!</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  Enter the room name here.
                </DialogContentText>

                <TextField autoFocus margin="dense" id="roomName" label="Room Name" fullWidth variant="standard"/>
              </DialogContent>

              <DialogActions>
                <Button disableRipple disableElevation disableFocusRipple sx={{ borderRadius: '0', "&:hover": {backgroundColor: "#6B8E23", border: '0px solid #fff'} }} variant="contained" onClick={handleClose}>Cancel</Button>
                <Button disableRipple disableElevation disableFocusRipple sx={{ borderRadius: '0', "&:hover": {backgroundColor: "#6B8E23", border: '0px solid #fff'} }} variant="contained" onClick={handleClose}>Save</Button>
              </DialogActions>
            </Dialog>
          </ThemeProvider>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
