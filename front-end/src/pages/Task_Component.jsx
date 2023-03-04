// Login Page

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faDotCircle, faUser, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import "../css/task_component.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton'
/**
 * A React component that represents the task box for listing tasks
 * @param {string} room location taks is assigned to
 * @param {string} name task name
 * @param {string} assigned person task is assigned to, if any
 * @returns The task component as highlighted below
 */
const TaskComponent = ({ title, room, assigned }) => {

    return (

        <div className="task_component">
            
            <div className="task_information">
                <div className="task_name">
                    <FontAwesomeIcon className="task_text_icon" icon={faClipboard} /> {title}
                </div>

                <div className="task_text"> 
                    <FontAwesomeIcon className="task_text_icon" icon={faDotCircle} /> {room}
                </div>

                <div className="task_text"> 
                    <FontAwesomeIcon className="task_text_icon" icon={faUser} /> {assigned}
                </div>
            </div>
       
            <ArrowForwardIosIcon className="next_button"/>

        </div>

    );
}

export default TaskComponent;