import React from "react";
import "../css/Home.css";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6B8E23",
      contrastText: "#fff",
    },
  },
});

const Home = (props) => {
  const [open, setOpen] = React.useState(false);

  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");

  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchRooms = () => {
    axios
      .get("/api/home")
      .then((response) => {
        const rooms = response.data;
        setRooms(rooms);
      })
      .catch((err) => {
        console.log("Bad room fetch");
      });
  };

  const addRoomToList = (room) => {
    const newRooms = [...rooms, room];
    setRooms(newRooms);
  };

  useEffect(() => {
    fetchRooms();

    const intervalHandle = setInterval(() => {
      fetchRooms();
    }, 5000);

    return (e) => {
      clearInterval(intervalHandle);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const roomUrl = camelize(name);

    axios
      .post("/api/home", {
        roomName: name,
        url: roomUrl,
      })
      .then((response) => {
        addRoomToList(response.data.room);
      })
      .catch((err) => {
        console.log("Submit error");
      });

    setName("");
    window.location.reload();
  };

  return (
    <>
      <Header title="Home" />
      <div>
        <div className="homeBody">
          {rooms.map((room, index) => (
            <Link to={`/room/${room.url}`}>
              <button key={index} className="roomButton" type="button">
                {room.roomName}
              </button>
            </Link>
          ))}

          <button
            className="roomButton"
            type="button"
            onClick={handleClickOpen}>
            Add Room
          </button>

          <ThemeProvider theme={theme}>
            <Dialog maxWidth="xs" open={open} onClose={handleClose}>
              <DialogTitle>Add Your Room!</DialogTitle>

              <form
                method="post"
                onSubmit={handleSubmit}
                className="form-container">
                <DialogContent>
                  <input
                    type="text"
                    placeholder="Enter room name here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <button
                    disableRipple
                    disableElevation
                    disableFocusRipple
                    sx={{
                      borderRadius: "0",
                      "&:hover": {
                        backgroundColor: "#6B8E23",
                        border: "0px solid #fff",
                      },
                    }}
                    variant="contained"
                    onClick={handleClose}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disableRipple
                    disableElevation
                    disableFocusRipple
                    sx={{
                      borderRadius: "0",
                      "&:hover": {
                        backgroundColor: "#6B8E23",
                        border: "0px solid #fff",
                      },
                    }}
                    variant="contained"
                    onClick={handleClose}>
                    Save
                  </button>
                </DialogActions>
              </form>
            </Dialog>
          </ThemeProvider>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
