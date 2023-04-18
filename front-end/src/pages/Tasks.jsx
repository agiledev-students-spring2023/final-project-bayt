import "../css/tasks.css";
import "../index.css";
import React, { useState, useEffect } from "react";
import TaskListComponent from "../components/Task_List_Component";
import AddIcon from "@mui/icons-material/Add";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

const Tasks = (props) => {
  const jwtToken = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get('/api/protected/tasks/', {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then(res => {
        // do nothing
      })
      .catch(err => {
        setIsLoggedIn(false); // update this state variable, so the component re-renders
    });
  }, []);

  const navigate = useNavigate();

  const sortAscending = (a, b) => {
    return a.due_time.$date.$numberLong - b.due_time.$date.$numberLong;
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

    // <>
    // {isLoggedIn ? (

    // ) : (
    //   <Navigate to='/login?error=protected' />
    // )}
    // </>
  );
};
export default Tasks;
