import React from "react";
import "../css/Home.css";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link, Navigate } from "react-router-dom";
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
  const jwtToken = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const [open, setOpen] = React.useState(false);

  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");

  // useEffect(() => {
  //   // send the request to the server api, including the Authorization header with our JWT token in it
  //   axios
  //     .get('/api/protected/home/',
  //       {
  //         headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
  //       }
  //     )
  //     .then(res => {
  //       // do nothing
  //     })
  //     .catch(err => {
  //       setIsLoggedIn(false); // update this state variable, so the component re-renders
  //     });
  // }, []);

  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  // Get the id of the room we added and post using house id
  const handleClose = () => {
    setOpen(false);
  };

  const fetchRooms = () => {
    axios
      .get("/api/home",
        {
          headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
        })
      .then((response) => {
        console.log("Good room fetch");
        const rooms = response.data;
        setRooms(rooms);
      })
      .catch((err) => {
        console.log("Bad room fetch", err);
      });

    console.log("FETCHED");
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

    console.log("SUBMITTING");
    e.preventDefault();
    const roomUrl = camelize(name);
    axios
      .post("/api/home", {
        roomName: name,
        url: roomUrl
      },
        {
          headers: { Authorization: `JWT ${jwtToken}` } // pass the token, if any, to the server
        }
      )
      .then((response) => {
        console.log("Submit success");
        addRoomToList(response.data.room);
      })
      .catch((err) => {
        console.log(err)
        console.log("Submit error");
      });

    console.log("SUBMITTED");

    setName("");
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header title="Home" />
          <div>
            <div className="homeBody">
              {rooms.map((room, index) => (<Link key={index} to={`/room/${room?.url}`}>
                <button key={index} className="roomButton" type="button">
                  {room?.roomName}
                </button>
              </Link>))}

              <button
                className="roomButton"
                type="button"
                onClick={handleClickOpen}>
                Add Room
              </button>
              <ThemeProvider theme={theme}>
                <Dialog maxWidth="xs" open={open} onClose={handleClose}>
                  <DialogTitle className="add-room-form">Add Your Room!</DialogTitle>

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
                        type="button"
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
      ) : (
        <Navigate to='/login?error=protected' />
      )}
    </>
  );
}

export default Home;
