import "../css/tasks.css";
import "../index.css";
import TaskListComponent from "../components/Task_List_Component";
import AddIcon from "@mui/icons-material/Add";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Tasks = (props) => {
  const navigate = useNavigate();

  const sortAscending = (a, b) => {
    return a.due_time.$date.$numberLong - b.due_time.$date.$numberLong;
  };

  const filterFunctionn = (task_data) => {
    return true;
  };

  return (
    <>
      <Header title="Tasks" />
      <div className="tasks_page">
        <TaskListComponent
          filterFunction={filterFunctionn}
          sortComparator={sortAscending}
          enableCheckbox={true}
          centerButton={false}
        />

        <button
          className="add_tasks_button"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/tasks/add")}
        >
          Add Tasks
        </button>
      </div>
      <Footer />
    </>
  );
};
export default Tasks;
