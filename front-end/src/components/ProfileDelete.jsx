import Popup from 'reactjs-popup';


//Delete account button and modal component
export default function DeleteAccountButton () {
    const handleDelete = () => {
      // Code to delete the account info from database goes here
      console.log('Account deleted');
    };
  
    return (
      <Popup
        trigger={<button className="delete-account-button">Delete Account</button>}
        modal
        overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
        nested
      >
        {(close) => (
          <div className="modal">
            <div className="warn">Warning</div>
            <div className="content">
              <p>Are you sure you want to delete your account? This action is irreversible.  All account data will be lost.</p>
            </div>
            <div className="actions">
              <button className="button" onClick={close}>
                Cancel
              </button>
              <button className="button danger" onClick={handleDelete}>
                Delete Account
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  };
  