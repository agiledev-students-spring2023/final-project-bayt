import { React } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import "../css/tasks.css";
import RoomHeader from "../components/Room_Header";
import TaskListComponent from "../components/Task_List_Component.jsx";
import AddRoom from "../components/Room_Add";
import Footer from "./Footer";
import { useState } from "react";

function RoomTemplate(props) {
  const { roomName } = useParams();

  const [filterFunctionn, ] = useState(() => (task_data) => {
    return task_data.room.toLowerCase() === roomName.toLowerCase();
  });
  const [sortFunctionn, ] = useState(() => (a, b) => {
    return a.due_time - b.due_time;
  }
  );
  return (
    <>
      <RoomHeader room={roomName}></RoomHeader>

      <Box sx={{ pb: 6 }}>
        <div className="task_box">
          <span className="vl"></span>

          <AddRoom></AddRoom>
          <TaskListComponent
            filterFunction={filterFunctionn}
            sortComparator={sortFunctionn}
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
