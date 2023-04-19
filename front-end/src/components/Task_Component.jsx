import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/task_component.css";
import "../index.css";

import {
  Room,
  PendingActions,
  AlternateEmail,
  Edit
} from "@mui/icons-material";
/**
 * A React component that represents the task box for listing tasks
 * @param {string} room location taks is assigned to
 * @param {string} name task name
 * @param {string} assigned person task is assigned to, if any
 * @returns The task component as highlighted below
 */
const TaskComponent = ({
  id,
  title,
  room,
  assigned,
  completed,
  SelectHandler,
  enableCheckbox,
}) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    return navigate(`/tasks/${id}`);
  };

  return (
    <div className={"task_box_comp " + (completed ? "complete" : "incomplete")}>
      {enableCheckbox && (
        <div className="checkbox-fix">
          <div className="wrapper">
            <label className="control control-checkbox">
              <input
                type="checkbox"
                className="control control-checkbox"
                checked={isChecked && !completed}
                onChange={(e) => {
                  setIsChecked(e.target.checked);
                  SelectHandler(id, e.target.checked && !completed);
                }}
              />
              <div className="indicator"></div>
            </label>
          </div>
        </div>
      )}

      <div
        onClick={handleClick}
        className={
          "task_component " +
          (isChecked && !completed ? "selected" : "deselected")
        }>
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

        <Edit className="next_button" />
      </div>
    </div>
  );
};

export default TaskComponent;
