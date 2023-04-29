import "../css/tasks.css";
import "../index.css";
import React, { useState} from "react";
import TaskListComponent from "../components/Task_List_Component";
import AddIcon from "@mui/icons-material/Add";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, Navigate } from "react-router-dom";
import "../index.css";

const Tasks = (props) => {
  const jwtToken = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const navigate = useNavigate();

  const sortAscending = (a, b) => {
    return a.due_time - b.due_time;
  };

  const filterFunctionn = (task_data) => {
    return true;
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header title="Tasks" />
          <div className="tasks_page">
            <TaskListComponent
              filterFunction={filterFunctionn}
              sortComparator={sortAscending}
              enableCheckbox={true}
              centerButton={false}
            />
    
            {/* <a href="/tasks/add">
              <img className="add_tasks_button" src={icon}></img>
            </a> */}
    
            <button
              className="add_tasks_button"
              variant="contained"
              starticon={<AddIcon />}
              onClick={() => navigate("/tasks/add")}>
              +
            </button>
          </div>
          <Footer />
        </>
      ) : (
        <Navigate to='/login?error=protected' />
      )}
    </>
  );
};
export default Tasks;
