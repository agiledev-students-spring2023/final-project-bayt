// Login Page

import React, { useEffect } from "react";
import "../css/task_component.css";

import {
  Room,
  PendingActions,
  ArrowForwardIos,
  AlternateEmail,
} from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";

/**
 * A React component that represents the task box for listing tasks
 * @param {string} room location taks is assigned to
 * @param {string} name task name
 * @param {string} assigned person task is assigned to, if any
 * @returns The task component as highlighted below
 */
const TaskComponent = ({id, title, room, assigned, completed, SelectHandler}) => {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <div className={"task_box_comp "+(completed?"complete":"incomplete")}>
      <Checkbox className="checkbox" checked={isChecked && !completed} onChange={e => {setIsChecked(e.target.checked); SelectHandler(id, e.target.checked && !completed)}}/>
      <div className={"task_component "+(isChecked && !completed ?"selected":"deselected")}>
        <div className="task_information">
          <div className="task_name">
            <PendingActions className="task_text_icon" /> {title}
          </div>

          {room && (
            <div className="task_text">
              <Room className="task_text_icon" /> {room}
            </div>
          )}

          <div className="task_text">
            <AlternateEmail className="task_text_icon" /> {assigned}
          </div>
        </div>

        <ArrowForwardIos className="next_button" />
      </div>
    </div>
  );
};

export default TaskComponent;
