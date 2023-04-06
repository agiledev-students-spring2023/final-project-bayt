import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "../css/alerts.css";
import "../index.css";
import alertsData from "../json/alerts_list.json";
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
                      <Link to={`/tasks/${alert.id}`}> {alert.task} due by {alert.date} </Link>
                        <input type="checkbox" />
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
