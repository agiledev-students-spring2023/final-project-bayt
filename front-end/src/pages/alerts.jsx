import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../css/alerts.css";
import "../index.css";
import alertsData from '../json/alerts_list.json';
let alerts_json = alertsData;

function Alerts() {

  const [alerts, setAlerts] = useState([]);

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

  const handleCompleteChange = (event, alertIndex) => {
    const isChecked = event.target.checked;
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert, index) =>
        index === alertIndex ? { ...alert, complete: isChecked } : alert
      )
    );
  };

  return (
    <>
      <Header title="Alerts" />
      <div className="alerts-page-body">
        <div className="list">
          <ul className="alertsList">
            {alerts.map((alert, index) => (
              <li key={index}>
                <div className="wrapper">
                  <label className="control control-checkbox">
                    {alert.task} due by {alert.date}
                    <input type="checkbox" checked={alert.complete} onChange={(event) => handleCompleteChange(event, index)}/>
                    <div className="indicator"></div>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Alerts;
