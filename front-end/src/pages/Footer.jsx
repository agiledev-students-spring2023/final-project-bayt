import React from "react";
import "../index.css";
import "../css/Footer.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TuneIcon from "@mui/icons-material/Tune";

const Footer = (props) => {
  const variant = "text";

  return (
    <footer className="footer">
      <div>
        <Button
          className="footer-buttons"
          variant={variant}
          component={Link}
          to="/tasks"
          startIcon={<FormatListBulletedIcon />}
        >
        </Button>
      </div>
      <div>
        <Button
          className="footer-buttons"
          variant={variant}
          component={Link}
          to="/finances"
          startIcon={<AttachMoneyIcon />}
        >
        </Button>
      </div>
      <div>
        <Button
          className="footer-buttons"
          variant={variant}
          component={Link}
          to="/home"
          startIcon={<HomeIcon />}
        >

        </Button>
      </div>
      <div>
        <Button
          className="footer-buttons"
          variant={variant}
          component={Link}
          to="/alerts"
          startIcon={<NotificationsIcon />}
        >
          
        </Button>
      </div>
      <div>
        <Button
          className="footer-buttons"
          variant={variant}
          component={Link}
          to="/settings"
          startIcon={<TuneIcon />}
        >
          
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
