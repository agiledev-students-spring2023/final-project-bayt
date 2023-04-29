import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "react-modal";
import "../css/Settings.css";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../index.css";
import axios from "axios";

Modal.setAppElement("#root");

const Settings = () => {
  const jwtToken = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const [membs, setMembs] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState({});
  const [membersIsOpen, setmembersIsOpen] = useState(false);

  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get('/api/protected/settings/')
      .then(res => {
        // do nothing
      })
      .catch(err => {
        setIsLoggedIn(false); // update this state variable, so the component re-renders
      });
  }, []);

  // useEffect(() => {
  //   localStorage.removeItem("token");
  // }, [loggedOut]);

  function formatMembersInfo(members) {
    let formattedString = "";
    for (let i = 0; i < members.length; i++) {
      formattedString += `${members[i].username} - ${members[i].role}\n`;
    }
    return formattedString;
  }

  const handleLinkClick = (evt, link) => {
    evt.preventDefault();

    if (link === "Household Information") {
      //code to fetch household data goes here.  Will probably just call a function that retreives using axios and whatnot
      //mock data for now
      axios
        .get(`/api/settings`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response);
          let membersString = formatMembersInfo(response.data);
          setMembs(membersString);
          setmembersIsOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (link === "Logout") {
      console.log("logging out");
      //code to disconnect/end session goes here
      localStorage.removeItem("token");
      //navigate back to login page
      window.location.href = "/";
    } else {
      setSelectedLink(link);
      setModalIsOpen(true);
    }
  };

  const handleModalClose = (evt) => {
    evt.preventDefault();
    setModalIsOpen(false);
    setmembersIsOpen(false);
  };

  const links = [
    {
      name: "Permissions",
      content:
        "Here is an overview of member permissions: \n\n Admin: Only admins can create new accounts for new members.  For this, Admin needs to set the users name and email in the add user option.\n\n User: A user has basic add tasks permission and can do everything Admin can except create a new member account. \n\n New members must log in with the username and shared housecode that Admin gives them.",
    },
    {
      name: "About",
      content:
        "Bayt is an application that simplifies the process of living in shared accomodations, delegating house chores, deciding grocery options, and splitting finances for shares household purchases. \n\n Bayt was created mainly for students in dormitories, as well as families that work together to take care of their home, but it is really for anyone that has shared accomodation. \n\n Bayt was developed by students Rami, Zander, Jojo, Zion, and Diana.",
    },
    {
      name: "Help Center",
      content:
        "Bayt is not meant to be a replacement for household communication, rather it should act as a service which facilitates it.\n\n  Bayt cannot help in matters of legal disputes, or with housemates who are clearly physcotic.  It can however, act as potential evidence for financial disagreements, provided all roomates have a semblance of integrity when inputting financial data.\n\n  Bayt cannot help you punish a lazy roomate, these matters are in your hands.\n\n  For extremely upsetting roomate situations, we recommend you move out.\n\n  Good luck!     ",
    },
  ];

  //the react-modal css stuff is so weird and documentation is limited
  //feel free to change this shit it looks okay but not sure if its most efficient
  //modal doesnt follow the app.css media so had to trial and error view percentage
  //Also I didnt know how to get this to work through the stylesheets )):
  const customStyles = {
    content: {
      position: "absolute",
      top: "50%",
      right: "40px",
      bottom: "-150px",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "2px solid #ccc",
      background: "white",
      width: "calc(0.85 * var(--max-width))" /* set the width to 85% of the max display width */,
      maxWidth: "600px",
      overflow: "auto" /* add overflow property for scrolling */,
    },
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="back">
          <Header title={"Settings"} />

          <div className="setts-info">
            <ul className="links-container">
              <button className=""
                href="#/"
                onClick={(evt) => handleLinkClick(evt, "Household Information")}>
                <li>{"Household Information"}</li>
              </button>
              {links.map((link, i) => (
                <button key={i} href="#/" onClick={(evt) => handleLinkClick(evt, link)}>
                  <li key={link.name}>{link.name}</li>
                </button>
              ))}

              <button href="/" onClick={(evt) => handleLinkClick(evt, "Logout")}>
                <li>{"Logout"}</li>
              </button>
            </ul>
          </div>

          <Modal
            style={customStyles}
            isOpen={modalIsOpen}
            onRequestClose={handleModalClose}>
            <h2 className="title">{selectedLink.name}</h2>
            <p style={{ whiteSpace: "pre-line" }}>{selectedLink.content}</p>
            {/* display any other properties you added to the link object */}
            <button className="modal-close" onClick={handleModalClose}>
              Close
            </button>
          </Modal>

          <Modal
            style={customStyles}
            isOpen={membersIsOpen}
            onRequestClose={handleModalClose}>
            <h2 className="title">Household Information</h2>
            <h3>Household Name:</h3>
            <p>Ravenclaw</p>
            {/*delete hardcoded RavenClaw later and pull name from database*/}
            <h3>Your Household Members:</h3>
            <p style={{ whiteSpace: "pre-line" }}>{membs}</p>
            <div className="add-member-button-container">
              <h3>Add a Member</h3>
              <p>This will allow everyone to stay connected and up to date</p>
              <button
                className="add-member-button"
                onClick={() => (window.location.href = "/Addmembers")}>
                <span>+</span>
              </button>
            </div>
            <button className="modal-close" onClick={handleModalClose}>
              Close
            </button>
          </Modal>
          <Footer />
        </div>
      ) : (
        <Navigate to='/login?error=protected' />
      )}
    </>
  );
};

export default Settings;
