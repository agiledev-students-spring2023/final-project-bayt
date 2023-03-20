import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from 'react-modal';
import '../css/Settings.css'

Modal.setAppElement('#root');
//replace h1 with header and delete from css
const Settings = () => {

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedLink, setSelectedLink] = React.useState('');

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='back'>
        <div classname="contain">
            <Header/>
        </div>
            <div className='setts-info'>
                <ul>
                    <li>
                        <a onClick={() => handleLinkClick('Household Information')}>Household Information</a>
                    </li>
                    <li>
                        <a onClick={() => handleLinkClick('Permissions')}>Permissions</a>
                    </li>
                    <li>
                        <a onClick={() => handleLinkClick('Share')}>Share</a>
                    </li>
                    <li>
                        <a onClick={() => handleLinkClick('Help Center')}>Help Center</a>
                    </li>
                    <li>
                        <a onClick={() => handleLinkClick('About')}>About</a>
                    </li>
                    <li>
                        <a onClick={() => handleLinkClick('Logout')}>Logout</a>
                    </li>
                </ul>
                <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose}>
                    <h2>{selectedLink}</h2>
                    <p>This is the {selectedLink} pop-up!</p>
                    <button onClick={handleModalClose}>Close</button>
                </Modal>
            </div>
            <Footer/>
        </div>

  );
};

export default Settings;
