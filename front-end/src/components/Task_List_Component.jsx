import { useState, useEffect } from "react";
import axios from "axios";
import "../css/task_list_component.css";
import "../index.css";
import TaskComponent from "./Task_Component.jsx";
import { CircularProgress } from "@mui/material";
import "../index.css";

const testing_mode = false;
const backend_route ='/api/tasks/';

const TaskListComponent = ({filterFunction, sortComparator, enableCheckbox, centerButton}) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState([]);

  const setComplete = () => {

    // Update each selected task to complete
    let temp_func = (selectObject) => {
      let taskoi = data.find(({ id }) => id.$oid === selectObject.id); // find task
      taskoi.complete = true; // set task to complete
      axios
        .put(
          backend_route + selectObject.id,
          taskoi
        )
        .then((response) => {
          // console.log(response); 
        })
        .catch((err) => {
          setError(`error: ${err}`);
        });
    };

    if (testing_mode) {
      temp_func = (selectObject) => {
        data.find(({ id }) => id.$oid === selectObject.id).complete = true;
      };
    }

    selected.forEach(temp_func);
    setSelected([]);
  };

  const handleDS = (taskID, bool) => {
    if (bool) {
      handleSelect(taskID);
    } else {
      handleDeselect(taskID);
    }
  };

  const handleSelect = (taskID) => {
    setSelected([
      ...selected,
      {
        id: taskID,
      },
    ]);
  };

  const handleDeselect = (taskID) => {
    setSelected(selected.filter((x) => x.id !== taskID));
  };

  const fetchData = () => {
    if (testing_mode) {
      task_json.sort(sortComparator);
      setData(task_json.filter(filterFunction));
      setLoaded(true);
    } else {
      axios
        .get(backend_route)
        .then((response) => {
          let task_arr = response.data;

          // Filter and Sort Data
          task_arr.sort(sortComparator);
          setData(task_arr.filter(filterFunction));
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoaded(true);
        });
    }
  };
  
  useEffect(() => {
    fetchData();

    const intervalHandle = setInterval(() => {
      fetchData();
    }, 5000);

    return (e) => {
      clearInterval(intervalHandle);
    };
    //eslint-disable-next-line
  }, []);

  let prev_day = "";
  const TaskDay = (due_time) => {
    const task_date = new Date(due_time);
    let day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      task_date
    );
    const diff = task_date.valueOf() - Date.now().valueOf();

    if (Math.abs(diff) >= 604800000) {
      day = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(task_date);
    }

    if (day !== prev_day) {
      prev_day = day;
      return (
        <>
          <h2 className="day_title">{day}</h2>
        </>
      );
    }
  };

  return (
    <>
      <div className="task_box">
        {/* <span className="vl"></span> */}
        {error && <p>{error}</p>}
        {!loaded && <CircularProgress className="loading_icon" />}
        {data.map((task_data) => {
          return (
            <div key={task_data.id.$oid}>
              {TaskDay(task_data.due_time.$date.$numberLong)}
              <TaskComponent
                id={task_data.id.$oid}
                title={task_data.task_name}
                room={task_data.room}
                assigned={task_data.assignee}
                completed={task_data.complete}
                SelectHandler={handleDS}
                enableCheckbox={enableCheckbox}
              />
            </div>
          );
        })}
        {selected.length > 0 && (
          <>
            <span className="transparent_box"></span>
            <button className={(centerButton ? "center_button" : "left_button")} variant="contained" onClick={(e) => setComplete()}>
              Set Complete
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default TaskListComponent;

let task_json = [
  {
    id: {
      $oid: "64055f38f032391df0001d6a",
    },
    task_name: "cook spaghetti",
    description: "wake up dog",
    room: "Kiana",
    assignee: "Evania",
    due_time: {
      $date: {
        $numberLong: 164717936800,
      },
    },
    complete: true,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d6b",
    },
    task_name: "cook spaghetti",
    description: "wipe the bed",
    room: "Melinda",
    assignee: "Harrison",
    due_time: {
      $date: {
        $numberLong: 164715103700,
      },
    },
    complete: false,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d6c",
    },
    task_name: "wipe floor in kitchen",
    description: "wake up dog",
    room: "Toluca",
    assignee: "Theo",
    due_time: {
      $date: {
        $numberLong: 164705693900,
      },
    },
    complete: false,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d6d",
    },
    task_name: "take out trash",
    description: "take dog on walk",
    room: null,
    assignee: "Rolland",
    due_time: {
      $date: {
        $numberLong: 164652765300,
      },
    },
    complete: true,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d6e",
    },
    task_name: "take out trash",
    description: "wipe the bed",
    room: null,
    assignee: "Twila",
    due_time: {
      $date: {
        $numberLong: 164687283300,
      },
    },
    complete: false,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d6f",
    },
    task_name: "call maintenance",
    description: "wake up dog",
    room: "Elazığ",
    assignee: "Cicily",
    due_time: {
      $date: {
        $numberLong: 164670839100,
      },
    },
    complete: true,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d70",
    },
    task_name: "wipe floor in kitchen",
    description: "clean properly this time",
    room: "Villamontes",
    assignee: "Osgood",
    due_time: {
      $date: {
        $numberLong: 164655518500,
      },
    },
    complete: false,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d71",
    },
    task_name: "call maintenance",
    description: "wake up dog",
    room: "Sorriso",
    assignee: "Garvy",
    due_time: {
      $date: {
        $numberLong: 164715321100,
      },
    },
    complete: false,
    repeat: 1,
  },
  {
    id: {
      $oid: "64055f38f032391df0001d72",
    },
    task_name: "clean bathroom",
    description: "wake up dog",
    room: "Taganrog",
    assignee: "Shaine",
    due_time: {
      $date: {
        $numberLong: 164684893500,
      },
    },
    complete: true,
    repeat: 1,
  },
];
