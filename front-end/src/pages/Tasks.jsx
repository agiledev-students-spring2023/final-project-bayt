// Login Page
import { useState, useEffect } from 'react'
import axios from 'axios'
import "../css/tasks.css";
import  TaskComponent from "../components/Task_Component.jsx"
import CircularProgress from '@mui/material/CircularProgress';
const task_json = [{"id":{"$oid":"6404d2a0f032391df000185a"},"task_name":"clean bathroom","description":"wipe the bed","room":"Providencia","assignee":"Letty","due_time":{"$date":{"$numberLong":16472100091400}},"repeat":1}, {"id":{"$oid":"6404d2a0f032391df000185b"},"task_name":"buy an air fryer","description":"clean properly this time","room":"Gorkha","assignee":"Rosette","due_time":{"$date":{"$numberLong":164619988300}},"repeat":1}, {"id":{"$oid":"6404d2a0f032391df000185c"},"task_name":"clean bathroom","description":"wipe the bed","room":"Playón Chico","assignee":"Karol","due_time":{"$date":{"$numberLong":164646661400}},"repeat":1}, {"id":{"$oid":"6404d2a0f032391df000185d"},"task_name":"cook spaghetti","description":"wake up dog","room":"Fitiuta Village","assignee":"Idette","due_time":{"$date":{"$numberLong":164639990600}},"repeat":1}, {"id":{"$oid":"6404d2a0f032391df000185e"},"task_name":"cook spaghetti","description":"wipe the bed","room":null,"assignee":"Anya","due_time":{"$date":{"$numberLong":164716927600}},"repeat":1}, {"id":{"$oid":"6404d2a0f032391df000185f"},"task_name":"clean bathroom","description":"wake up dog","room":"Sioux Lookout","assignee":"Ramsey","due_time":{"$date":{"$numberLong":164696181700}},"repeat":1}];
const Tasks = props =>  {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');

    let prev_day = '';
    const TaskDay = task => {
        const task_date =  new Date(task.due_time.$date.$numberLong);
        let day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(task_date);
        const diff = task_date.valueOf() - Date.now().valueOf();

        //Display in Month, day, year format if greater than a week
        if(diff>=604800000) {
            day = new Intl.DateTimeFormat("en-US", {month: "long", day: "numeric", year: "numeric"}).format(task_date);
        } 

        if(day!==prev_day) {
            prev_day = day
            return (
                <h2 className="day_title">{day}</h2>
            );
        }

    }

    //Sorting the dates of DATA elems
    const sortComparator = (a,b) => {
        // Sort by date 
        return a.due_time.$date.$numberLong-b.due_time.$date.$numberLong;
    }

    const fetchData = () => {
        setData(task_json)
        data.sort(sortComparator)
        setLoaded(true)
        // axios
        // .get(`${process.env.REACT_APP_API_TASKS}`)
        // .then(response => {
        //     // axios bundles up all response da ta in response.data property
        //     // const data = response.data
        //     // data.sort(sortComparator)
        //     setData(data)
        // })
        // .catch(err => {
        //     setError(err)
        // })
        // .finally(() => {
        //     setLoaded(true)
        // })
    }

    useEffect(() => {
        // fetch messages this once
        fetchData()
    
        // set a timer to load data from server every n seconds
        // const intervalHandle = setInterval(() => {
        //   fetchData()
        // }, 5000)
    
        // return a function that will be called when this component unloads
        return e => {
          // clear the timer, so we don't still load messages when this component is not loaded anymore
        //   clearInterval(intervalHandle)
        }
      }) 

    return (
        <div className='task_box'>
            {error && <p>{error}</p>}
            {!loaded && <CircularProgress className="loading_icon"/>}
            {data.map((task_data) => {
                return(
                    <div key={task_data.id.$oid}>
                        {TaskDay(task_data)}
                        <TaskComponent title={task_data.task_name} room={task_data.room} assigned={task_data.assignee}/>
                    </div>
                );
            })}
            
        </div>
    );
}

export default Tasks;