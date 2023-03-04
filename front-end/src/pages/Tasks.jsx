// Login Page

import React from 'react';
import "../css/tasks.css";
import  TaskComponent from "../components/Task_Component.jsx"
const Tasks = props =>  {
    return (
        <div id='outer'>
            <TaskComponent title="Test" room="Bedroom" assigned="Josh"/>
        </div>
    );
}

export default Tasks;