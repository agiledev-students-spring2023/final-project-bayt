import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from 'react-modal';
import '../css/Settings.css'
import {useState} from "react";

Modal.setAppElement('#root');


const Settings = () => {

    const [membs,setMembs] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState({});
    const [membersIsOpen,setmembersIsOpen] = useState(false);


    function formatMembersInfo(members) {
        let formattedString = '';
        for (let i = 0; i < members.length; i++) {
          formattedString += `${members[i].member_name} - ${members[i].role}\n`;
        }
        return formattedString;
      }
  

    const handleLinkClick = (link) => {

      if (link==="Household Information"){
        //code to fetch household data goes here.  Will probably just call a function that retreives using axios and whatnot
        //mock data for now
        let membersString =formatMembersInfo(membersInfo_json);
        setMembs(membersString)
        setmembersIsOpen(true)
      }

      /*
      if (link==="Logout"){
        //code to disconnect session goes here
        //navigate back to login page
      }
      */

      else{
        setSelectedLink(link);
        setModalIsOpen(true);
      }

    };
  

    const handleModalClose = () => {
      setModalIsOpen(false);
      setmembersIsOpen(false);
    };



  const links = [
    {
      name: 'Permissions',
      content: 'Here is an overview of member permissions: \n\n Admin: Admin is only user that can create a new account for a new member.  For this Admin needs to set the users name and email in the add user option.\n\n User: A user has basic add tasks permission and can do everything Admin can except create a new member account. \n\n New members must log in with the username and shared housecode that Admin gives them.',  
    },
    {
      name: 'About',
      content: "Bayt is an application that simplifies the process of living in shared accomodations, delegating house chores, deciding grocery options, and splitting finances for shares household purchases. \n\n Bayt was created mainly for students in dormitories, as well as families that work together to take care of their home, but it is really for anyone that has shared accomodation. \n\n Bayt was developed by students Rami, Zander, Jojo, Zion, and Diana."
    },
    {
      name: 'Help Center',
      content: 'Bayt is not meant to be a replacement for household communication, rather it should act as a service which facilitates it.\n\n  Bayt cannot help in matters of legal disputes, or with housemates who are clearly physcotic.  It can however, act as potential evidence for financial disagreements, provided all roomates have a semblance of integrity when inputting financial data.\n\n  Bayt cannot help you punish a lazy roomate, these matters are in your hands.\n\n  For extremely upsetting roomate situations, we recommend you move out.\n\n  Good luck!     ',
    }, 
  ];


//the react-modal css stuff is so weird and documentation is limited
//I didnt know how to get this to work through the stylesheets )):
  const customStyles = {
    content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '2px solid #ccc',
        background: '#f4f1de',
       
    }
  };


  return (
    <div className='back'>

        <div className="contain">
            <Header/>
        </div>

            <div className='setts-info'>

                <ul>
                    <li>
                    <a  href="#/" onClick={() => handleLinkClick('Household Information')}>{"Household Information"}</a>
                    </li>
                    {links.map(link => (
                      <li key={link.name}>
                        <a href="#/" onClick={() => handleLinkClick(link)}>{link.name}</a>
                      </li>
                    ))}
                    <li>
                        Logout
                    </li>
                </ul>

                <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={handleModalClose}>
                    <h2 className='title'>{selectedLink.name}</h2>
                    <p style={{whiteSpace: "pre-line"}}>{selectedLink.content}</p>
                    {/* display any other properties you added to the link object */}
                    <button className='modal-close' onClick={handleModalClose}>Close</button>
                </Modal>

                <Modal style={customStyles} isOpen={membersIsOpen} onRequestClose={handleModalClose}>
                    <h2 className='title'>Household Information</h2>
                    <h3>Household Name:</h3> 
                    <p>Ravenclaw</p>
                    {/*delete hardcoded RavenClaw later and pull name from database*/}
                    <h3>Your Household Members:</h3>
                    <p style={{whiteSpace: "pre-line"}}>{membs}</p>
                    <div className="add-member-button-container">
                        <h3>Add a Member</h3>
                        <p>This will allow everyone to stay connected and up to date</p>
                        <button className="add-member-button" onClick={() => window.location.href = '/Addmembers'}>
                            <span>+</span>
                        </button>
                    </div>
                    <button className='modal-close' onClick={handleModalClose}>Close</button>
                </Modal>

            </div>
            <Footer/>
        </div>
  );
};

export default Settings;



//MOCK DATA
//I assume this is data obtained using the shard housecode to retrieve all members using said code
let membersInfo_json = [
    {
      id: {
        $oid: "64055f38f032391df0001d6a",
      },
      member_name: "Zander",
      username: "zander123",
      role: "User",
      contact: "555-555-5555",
    },
    {
      id: {
        $oid: "64055f38f032391df0001d6b",
      },
      member_name: "Rami",
      username: "rami123",
      role: "Admin",
      contact: "666-666-6666",
    },
    {
      id: {
        $oid: "64055f38f032391df0001d6c",
      },
      member_name: "Jojo",
      username: "jojo123",
      role: "user",
      contact: "666-666-6666",
    },
    {
      id: {
        $oid: "64055f38f032391df0001d6d",
      },
      member_name: "Zion",
      username: "zion123",
      role: "user",
      contact: "666-666-6666",
    },
    {
      id: {
        $oid: "64055f38f032391df0001d6e",
      },
      member_name: "Diana",
      username: "diana123",
      role: "user",
      contact: "666-666-6666",
    },
  ];
  