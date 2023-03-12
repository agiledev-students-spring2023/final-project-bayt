import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import '../css/alerts.css';
import '../index.css';

function Alerts() {

    const [task, setTask] = useState('');
    const [date, setDate] = useState('');

    const [alerts, setAlerts] = useState([]);

    const handleAddAlert = (alert) => {
        setAlerts([...alerts, alert]);
    };

    useEffect(() => {
        fetch('https://my.api.mockaroo.com/alerts.json?key=8eff7c60')
            .then(response => response.json())
            .then(data => setAlerts(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className='page-body'>
            <div className='content'>
                <h1>Alerts</h1>
                <div className='list'>
                    <ul>
                        {alerts.map((alert, index) => (
                            <li key={index}>
                                <div class="wrapper">
                                    <label class="control control-checkbox">
                                        {alert.task} due by {alert.date}
                                        <input type="checkbox" />
                                        <div class="indicator"></div>
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='footer'>
            <Footer />
            </div>
            
        </div>

    );
}

export default Alerts;