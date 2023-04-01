import { React } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import "../css/tasks.css";
import RoomHeader from "../components/Room_Header";
import TaskListComponent from "../components/Task_List_Component.jsx";
import AddRoom from "../components/Room_Add";
import Footer from "./Footer";

function RoomTemplate(props) {
  const { roomName } = useParams();

  //Comparator for the sorting by the dates of API DATA elems
  const sortAscending = (a, b) => {
    return a.due_time.$date.$numberLong - b.due_time.$date.$numberLong;
  };
  const filterFunctionn = (task_data) => {
    return task_data.room === roomName;
  };
  return (
    <>
      <RoomHeader room={roomName}></RoomHeader>

      <Box sx={{ pb: 6 }}>
        <div className="task_box">
          <span className="vl"></span>

          <AddRoom></AddRoom>
          <TaskListComponent
            filterFunction={filterFunctionn}
            sortComparator={sortAscending}
            enableCheckbox={true}
            centerButton={true}
          />
        </div>
      </Box>

      <Footer />
    </>
  );
}

export default RoomTemplate;
