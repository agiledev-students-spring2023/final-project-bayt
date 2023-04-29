import "../css/tasks.css";
import "../index.css";
import React, { useState} from "react";
import TaskListComponent from "../components/Task_List_Component";
import AddIcon from "@mui/icons-material/Add";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, Navigate } from "react-router-dom";
import "../index.css";
import TaskFilterComponent from "../components/Task_Filter_Component";

const Tasks = (props) => {
  const jwtToken = localStorage.getItem("token");
  const [filterFunctionn, setFilterFunctionn] = useState(() => (task_data) => {
    return true;
  });
  const [sortFunctionn, setSortFunctionn] = useState(() => (a, b) => {
    return a.due_time - b.due_time;
  }
  );
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get('/api/protected/tasks/')
      .then(res => {
        // do nothing
      })
      .catch(err => {
        setIsLoggedIn(false); // update this state variable, so the component re-renders
      });
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header title="Tasks" />
          <div className="tasks_page">
            <TaskFilterComponent setFilterFunction={setFilterFunctionn} setSortFunction={setSortFunctionn} />
            <TaskListComponent
              filterFunction={filterFunctionn}
              sortComparator={sortFunctionn}
              enableCheckbox={true}
              centerButton={false}
            />

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
