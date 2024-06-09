import React, { useState } from "react";
import { Checkbox, FormGroup, Icon, IconButton } from "@mui/material";
import { FormControlLabel, Switch } from "@mui/material";
import { Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import "../css/task_filter_component.css";

const TaskFilterComponent = ({ setFilterFunction, setSortFunction }) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [sortDescending, setSortDescending] = useState(true);
  React.useEffect(() => {
    if (showCompleted) {
      setFilterFunction(() => (task) => {
        return !task.complete;
      });
    } else {
      setFilterFunction(() => (task) => {
        return true;
      });
    }
    if (sortDescending) {
      setSortFunction(() => (a, b) => {
        return a.due_time - b.due_time;
      });
    } else {
      setSortFunction(() => (a, b) => {
        return b.due_time - a.due_time;
      });
    }
  }, [showCompleted, setFilterFunction, sortDescending, setSortFunction]);

  return (
    <div className="filter-container">
      {/* Two buttons in mui container*/}
      <div className="filter-button-container">
        <Button onClick={() => setSortDescending(!sortDescending)}>
          <SortIcon
            style={{ transform: sortDescending ? "none" : "scaleY(-1)" }}
          />
          Sort
        </Button>
        <div className="switch-button">
          <label>
            <input
              type="checkbox"
              className="ios-switch"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
            />
            <div>
              <div></div>
            </div>
          </label>
            <div className="switch-label">{showCompleted ? "Incomplete Tasks" : "All Tasks"}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilterComponent;
