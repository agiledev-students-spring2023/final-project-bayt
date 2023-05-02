import * as React from 'react';
import Badge from '@mui/material/Badge';
import TaskComponent from "./Task_Component.jsx";

export default function ColorBadgeTask(props) {
    const handleDS = (taskID, bool) => {
        if (bool) {
          handleSelect(taskID);
        } else {
          handleDeselect(taskID);
        }
    };
    
    return (
        <Badge badgeContent={4} color="secondary">
            <TaskComponent id={props._id} title={props.task_name} room={props.room} assigned={props.assignee} completed={props.complete} SelectHandler={handleDS} enableCheckbox={props.enableCheckbox}></TaskComponent>
        </Badge>
    );
}