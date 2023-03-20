import React from "react";

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
    <div className="page-body">
      <footer className="footer">
        <Button
          variant={variant}
          component={Link}
          to="/tasks"
          startIcon={<FormatListBulletedIcon />}
        >
          Tasks
        </Button>
        <Button
          variant={variant}
          component={Link}
          to="/finances"
          startIcon={<AttachMoneyIcon />}
        >
          Finances
        </Button>
        <Button
          variant={variant}
          component={Link}
          to="/home"
          startIcon={<HomeIcon />}
        >
          Home
        </Button>
        <Button
          variant={variant}
          component={Link}
          to="/alerts"
          startIcon={<NotificationsIcon />}
        >
          Alerts
        </Button>
        <Button
          variant={variant}
          component={Link}
          to="/settings"
          startIcon={<TuneIcon />}
        >
          Settings
        </Button>
      </footer>
    </div>
  );
};

export default Footer;
