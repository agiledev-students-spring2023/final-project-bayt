import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../css/alerts.css";
import "../index.css";

function Alerts() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const [alerts, setAlerts] = useState([]);

  const handleAddAlert = (alert) => {
    setAlerts([...alerts, alert]);
  };

  useEffect(() => {
    setAlerts(alerts_json);
  }, []);

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
                    <input type="checkbox" />
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

let alerts_json = [
  { task: "cubilia curae", date: "9/3/2022" },
  { task: "ligula in", date: "10/5/2022" },
  { task: "velit", date: "3/6/2023" },
  { task: "interdum", date: "10/8/2022" },
  { task: "rutrum rutrum", date: "6/11/2022" },
  { task: "dapibus augue", date: "1/5/2023" },
  { task: "in faucibus", date: "10/7/2022" },
  { task: "turpis elementum", date: "9/5/2022" },
  { task: "etiam vel", date: "7/18/2022" },
  { task: "tortor eu", date: "6/7/2022" },
];

export default Alerts;
