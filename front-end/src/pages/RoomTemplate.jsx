import { React, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import {Button, CircularProgress} from "@mui/material";

import "../css/tasks.css";
import RoomHeader from '../components/Room_Header';
import TaskComponent from "../components/Task_Component.jsx";
import AddRoom from '../components/Room_Add';
import Footer from './Footer'

const testing_mode = true;

function RoomTemplate(props) {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");
    const [selected, setSelected] = useState([]); // OID's of selected objects

    const { roomName } = useParams();

    // Complete the selected tasks
    const setComplete = () => {
        selected.forEach(selectObject => data.find(({id}) => id.$oid===selectObject.id).complete = true);
        setSelected([]);
    }

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
    });

    let prev_day = "";
    const TaskDay = (due_time) => {
        const task_date = new Date(due_time);
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

    return (
        <>
            <RoomHeader></RoomHeader>

            <Box sx={{ pb: 6 }}>
                <div className="task_box">
                    <span className="vl"></span>

                    {error && <p>{error}</p>}

                    {!loaded && <CircularProgress className="loading_icon" />}

                    <AddRoom room={roomName}></AddRoom>

                    {data.map((task_data) => {
                        return (
                            <div key={task_data.id.$oid}>
                            {TaskDay(task_data.due_time.$date.$numberLong)}
                            <TaskComponent
                                id={task_data.id.$oid}
                                title={task_data.task_name}
                                room={task_data.room}
                                assigned={task_data.assignee}
                                completed={task_data.complete} // needs to be a state
                                SelectHandler={handleDS}
                            />
                            </div>
                        );
                    })}
                    
                    {selected.length > 0 && <><span className="transparent_box"></span><Button variant="contained" onClick={(e) => setComplete()}>Set Complete</Button></>}
                </div>
            </Box>

            <Footer />
        </>
    )
}

export default RoomTemplate;

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
  