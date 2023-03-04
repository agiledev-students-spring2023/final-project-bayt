// Login Page

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faLocationArrow, faUser, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import "../css/task_component.css";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RoomIcon from '@mui/icons-material/Room';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
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
                    <PendingActionsIcon className="task_text_icon"/> {title}
                </div>

                <div className="task_text"> 
                    <RoomIcon className="task_text_icon"/> {room}
                </div>

                <div className="task_text"> 
                    <AlternateEmailIcon className="task_text_icon"/> {assigned}
                </div>
            </div>
       
            <ArrowForwardIosIcon className="next_button"/>

        </div>

    );
}

export default TaskComponent;