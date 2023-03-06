// Login Page
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/tasks.css";
import TaskComponent from "../components/Task_Component.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from './Footer';

//TESTING MODE: This is to toggle between API calls and hardcoded JSON data
const testing_mode = true;

const Tasks = (props) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  let prev_day = "";
  const TaskDay = (task) => {
    const task_date = new Date(task.due_time.$date.$numberLong);
    let day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      task_date
    );
    const diff = task_date.valueOf() - Date.now().valueOf();

    //Display in Month, day, year format if greater than a week
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
          <div className="line"></div>
          <h2 className="day_title">{day}</h2>
        </>
      );
    }
  };

  //Comparator for the sorting by the dates of API DATA elems
  const sortComparator = (a, b) => {
    return a.due_time.$date.$numberLong - b.due_time.$date.$numberLong;
  };

  const fetchData = () => {
    if (testing_mode) {
      setData(task_json);
      task_json.sort(sortComparator);
      setLoaded(true);
    } else {
      axios
        .get(`${process.env.REACT_APP_API_TASKS}`)
        .then((response) => {
          // axios bundles up all response da ta in response.data property
          const data = response.data;
          data.sort(sortComparator);
          setData(data);
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
    // fetch messages this once
    fetchData();

    // set a timer to load data from server every n seconds
    const intervalHandle = setInterval(() => {
      fetchData();
    }, 5000);

    // return a function that will be called when this component unloads
    return (e) => {
      // clear the timer, so we don't still load messages when this component is not loaded anymore
      clearInterval(intervalHandle);
    };
  }, []);

  return (
    <div className="task_box">
      {error && <p>{error}</p>}
      {!loaded && <CircularProgress className="loading_icon" />}
      {data.map((task_data) => {
        return (
          <div key={task_data.id.$oid}>
            {TaskDay(task_data)}
            <TaskComponent
              title={task_data.task_name}
              room={task_data.room}
              assigned={task_data.assignee}
            />
            <Footer />
          </div>
        );
      })}
    </div>
  );
};
export default Tasks;

//MOCK DATA
let task_json = [
    {
      id: { $oid: "6403e5c9f032391df0001828" },
      task_name: "wipe floor in kitchen",
      description: "clean properly this time",
      room: "Vipingo Estate",
      assignee: "Rheta",
      due_time: { $date: { $numberLong: 165676748700 } },
      repeat: 1,
    },
    {
      id: { $oid: "6403e5c9f032391df0001829" },
      task_name: "call maintenance",
      description: "clean properly this time",
      room: "Mahanoro",
      assignee: "Benedict",
      due_time: { $date: { $numberLong: 166807471100 } },
      repeat: 1,
    },
    {
      id: { $oid: "6403e5c9f032391df000182a" },
      task_name: "call maintenance",
      description: "take dog on walk",
      room: "Paso Caballos",
      assignee: "Vergil",
      due_time: { $date: { $numberLong: 165998506900 } },
      repeat: 1,
    },
    {
      id: { $oid: "6403e5c9f032391df000182b" },
      task_name: "call maintenance",
      description: "clean properly this time",
      room: "Ponta Grossa",
      assignee: "Eugenius",
      due_time: { $date: { $numberLong: 166918952900 } },
      repeat: 1,
    },
    {
      id: { $oid: "6403e5c9f032391df000182c" },
      task_name: "take out trash",
      description: "take dog on walk",
      room: "Eureka",
      assignee: "Gilemette",
      due_time: { $date: { $numberLong: 167079582300 } },
      repeat: 1,
    },
    {
      id: { $oid: "6403e5c9f032391df000182d" },
      task_name: "wipe floor in kitchen",
      description: "clean properly this time",
      room: "Burns",
      assignee: "Chrissie",
      due_time: { $date: { $numberLong: 165918810000 } },
      repeat: 1,
    },
    {
      id: { $oid: "6403e5c9f032391df000182e" },
      task_name: "call maintenance",
      description: "wake up dog",
      room: "Omsk",
      assignee: "Obadias",
      due_time: { $date: { $numberLong: 165777791000 } },
      repeat: 1,
    },
    {
      id: { $oid: "6403e5c9f032391df000182f" },
      task_name: "cook spaghetti",
      description: "clean properly this time",
      room: "Poprad",
      assignee: "Kelcie",
      due_time: { $date: { $numberLong: 165402530900 } },
      repeat: 1,
    },
  ];
