import React from 'react';
import { useNavigate } from "react-router-dom";

import {
  PendingActions,
  ArrowForwardIos,
  AlternateEmail,
} from "@mui/icons-material";

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import "../css/task_component.css";
import "../css/Room_Add.css";

function AddRoom(props) {
    const navigate = useNavigate();

    function handleClick(evt) {
        return navigate('/tasks/add');
    }

    return (
        <div className={"task_box_comp incomplete addRoomContainer"}>
            <AddCircleOutlineOutlinedIcon sx={{ '&:hover': {cursor: 'pointer'}, p: '9px'}} onClick={handleClick}></AddCircleOutlineOutlinedIcon>
            <div className={"task_component deselected addRoomComponent"} onClick={handleClick}>
                <div className="task_information">
                    <div className="task_name">
                        <PendingActions className="task_text_icon" /> Add Your Task
                    </div>

                    <div className="task_text">
                        <AlternateEmail className="task_text_icon" /> Add Assign to Someone!
                    </div>
                </div>

                <ArrowForwardIos className="next_button" />
            </div>
        </div>
    )
}

export default AddRoom;