import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "../css/alerts.css";
import "../index.css";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:8000/alerts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const alerts = await response.json();
        setAlerts(alerts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAlerts();
  }, []);

  const handleCheckboxClick = async (event, alert) => {
    console.log(alert);
    try {
      const isChecked = event.target.checked;
      const alertId = alert.id; // Extract the id value from the alert object
      const response = await fetch(`http://localhost:8000/alerts/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId, isChecked }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title="Alerts" />
      <div className="alerts-page-body">
        {alerts.length === 0 ? (
          <div className="no-alerts">
            <p>No incomplete tasks! Good job : )</p>
          </div>
        ) : (
          <div className="list">
            <ul className="alertsList">
              {alerts.map((alert, index) => (
                <li key={index}>
                  <div className="wrapper">
                    <label className="control control-checkbox">
                      <Link to={`/tasks/${alert.id.$oid}`}>
                        {" "}
                        {alert.task} due by {alert.date}{" "}
                      </Link>
                      <input
                        type="checkbox"
                        onClick={(event) => handleCheckboxClick(event, alert)}
                      />
                      <div className="indicator"></div>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Alerts;
