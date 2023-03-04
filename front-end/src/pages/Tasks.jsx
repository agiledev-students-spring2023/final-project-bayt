// Login Page

import React from 'react';
import "../css/tasks.css";
import  TaskComponent from "./Task_Component"
const Tasks = props =>  {
    return (
        <div id='outer'>
            <TaskComponent title="Test" room="Bedroom" assigned="Josh"/>
        </div>
    );
}

export default Tasks;