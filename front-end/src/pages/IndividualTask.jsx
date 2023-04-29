import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import Alert from '@mui/material/Alert';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";


import '../css/IndividualTask.css';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

function generateOId() {
    let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

const defaultValues = {
    task_name: "",
    room: "",
    assignee: "",
    repeat: "",
    due_time: new Date().valueOf(),
    description: "",
    complete: false,
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#6B8E23',
            contrastText: '#fff',
        },
    },
});

const task_route = `/api/tasks/`;
const home_route = `/api/home/`; // gets rooms
const settings_route = `/api/settings/`; // gets people

function IndividualTask(props) {
    const navigate = useNavigate();
    const { id } = useParams();

    const [rooms, setRooms] = useState([]);
    const [people, setPeople] = useState([]);

    const [formValues, setFormValues] = useState(defaultValues);
    const [oldFormValues, setOldFormValues] = useState(defaultValues);
    const [errorMessage, setErrorMessage] = useState('');


    const fetchHouseResidents = async () => {
        console.log("fetching house residents");
        return axios
            .get(settings_route,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('token')}`
                    }
                })
            .then((response) => {
                console.log(response?.data);
                return response?.data;
            })
            .catch((err) => {
                return err;
            });
    };

    const fetchHouseRooms = async () => {
        return axios
            .get(home_route,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('token')}`
                    }
                })
            .then((response) => {
                // console.log(response?.data);
                return response?.data;
            })
            .catch((err) => {
                return err;
            });
    };

    const fetchTaskData = async (id) => {
        return axios
            .get(task_route + `${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('token')}`
                    }
                }
            )
            .then((response) => {
                const taskData = response.data;
                // console.log(taskData);
                return taskData;
            })
            .catch((err) => {
                // log the id
                console.log(id);
                console.log(err);
                return err;
            });
    };

    useEffect(() => {
        async function fetchAndSet() {
            setRooms(await fetchHouseRooms());
            setPeople(await fetchHouseResidents());

            if (id) {
                const taskData = await fetchTaskData(id);
                if (!taskData.response) {
                    const temp = {
                        _id: id,
                        task_name: taskData['task_name'] ? taskData['task_name'] : '',
                        room: taskData['room'] ? taskData['room'] : '',
                        assignee: taskData['assignee'] ? taskData['assignee'] : '',
                        repeat: taskData['repeat'] ? taskData['repeat'] : '',
                        due_time: taskData['due_time'] ? taskData['due_time'] : new Date().valueOf(),
                        description: taskData['description'] ? taskData['description'] : '',
                        complete: taskData['complete'],
                    };
                    setFormValues(temp);
                    setOldFormValues(temp);
                }
                else {
                    setErrorMessage(<Alert severity="error">{`${taskData.response.data.message}`}</Alert>);

                    setTimeout(() => {
                        navigate('/tasks');
                    }, 2000);
                }
            }
        };
        fetchAndSet();
    }, []);

    const handleNavigate = () => {
        return navigate(-1);
    }

    const handleInputChange = (e, date) => {
        if (e == null && date != null) {
            setFormValues({
                ...formValues,
                due_time: new Date(date['$d']).valueOf(),
            });
        }
        else {
            const { name, value } = e.target;
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            // if rooms or assignees are not equal to initially fetched task data then include oid, else don't in formValues because we dont have its oid
            // and shouldnt call put without the id values
            if (formValues['room'] === oldFormValues['room']) {
                delete formValues['room'];
            }
            if (formValues['assignee'] === oldFormValues['assignee']) {
                delete formValues['assignee'];
            }

            axios
                .put(task_route + `${id}`, formValues, { headers: { 'Content-Type': 'application/json', 'Authorization': `JWT ${localStorage.getItem('token')}` } })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            console.log(formValues);
            axios
                .post(task_route, formValues, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('token')}`
                    }
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        setFormValues(defaultValues);
        navigate('/home');
    };

    return (
        <>
            <Header />

            <ThemeProvider theme={theme}>
                <Box maxWidth='xs' sx={{ height: 70, mx: 3, pb: 0, display: 'flex', alignItems: 'flex-end' }}>
                    <Button onClick={handleNavigate} sx={{ "&:hover": { color: 'rgb(74, 99, 24)', backgroundColor: "transparent", border: '0px #fff solid' } }} disableRipple disableElevation disableFocusRipple variant="text" startIcon={<ArrowBackIosIcon />}>
                        Back
                    </Button>
                </Box>
            </ThemeProvider>

            {errorMessage}

            <form className='taskFormContainer' onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <Box sx={{ m: 3, mt: 1, pt: 4, maxWidth: '100%' }}>
                        <TextField disabled={formValues['complete']} required sx={{ mb: 2 }} variant="standard" fullWidth id="task_name_input" name="task_name" label="Task Title" type="text" value={formValues.task_name} onChange={handleInputChange} />

                        <TextField disabled={formValues['complete']} value={formValues.description} sx={{ mb: 2 }} fullWidth required id="description" name='description' label="Enter Task Description" multiline rows={4} variant="standard" onChange={handleInputChange} />

                        <FormControl variant="standard" sx={{ mb: 2, width: '100%' }}>
                            <InputLabel id="room-label">Select Room</InputLabel>
                            <Select disabled={formValues['complete']} defaultValue={defaultValues.room} name="room" labelId="room-label" id="room-select-helper" value={formValues.room} label="room" onChange={handleInputChange}>
                                {id ? <MenuItem key={'unique_id'} value={`${formValues.room}`}>{`${formValues.room}`}</MenuItem> : <MenuItem key={'unique_id'}></MenuItem>}
                                {rooms.filter((room) => room?.roomName !== '').map((room) => (
                                    <MenuItem key={room?._id} value={room?._id}>
                                        {room?.roomName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl required variant="standard" sx={{ mb: 2, width: '100%' }}>
                            <InputLabel id="assign-label">Assign To</InputLabel>
                            <Select disabled={formValues['complete']} required name="assignee" labelId="assign-label" id="assign-select-helper" value={formValues.assignee} label="assign" onChange={handleInputChange}>
                                {id ? <MenuItem key={'unique_Id'} value={`${formValues.assignee}`}>{`${formValues.assignee}`}</MenuItem> : <MenuItem key={'unique_id'}></MenuItem>}
                                {people.map((person) => (
                                    <MenuItem key={person._id} value={person._id}>
                                        {person.first_name + ' ' + person.last_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl required variant="standard" sx={{ mb: 2, width: '100%' }}>
                            <InputLabel id="repeat-label">Repeat Every</InputLabel>
                            <Select disabled={formValues['complete']} required name="repeat" labelId="repeat-label" id="repeat-select-helper" value={formValues.repeat} label="repeat" onChange={handleInputChange}>
                                {id && [0, 1, 7, 14, 30, 365].indexOf(formValues.repeat) === -1 ? <MenuItem value={formValues.repeat}>{`Every ${formValues.repeat} Day`}</MenuItem> : ''}
                                <MenuItem value={0}>Never</MenuItem>
                                <MenuItem value={1}>Every Day</MenuItem>
                                <MenuItem value={7}>Every Week</MenuItem>
                                <MenuItem value={14}>Every 2 Weeks</MenuItem>
                                <MenuItem value={30}>Every Month</MenuItem>
                                <MenuItem value={365}>Every Year</MenuItem>
                            </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker disabled={formValues['complete']} value={dayjs(new Date(formValues['due_time']))} required label="Select Date" sx={{ mb: 2, width: '100%' }} slotProps={{ textField: { required: true, fullWidth: true } }} onChange={date => handleInputChange(null, date)} />
                        </LocalizationProvider>

                        <Button disabled={formValues['complete']} sx={{ "&:hover": { color: '#fff', border: '0px #fff solid' } }} variant="contained" fullWidth={true} endIcon={<LibraryAddIcon />} color="primary" type="submit">Save</Button>
                    </Box>
                </ThemeProvider>
            </form>
            <Footer />
        </>
    )
}

export default IndividualTask;