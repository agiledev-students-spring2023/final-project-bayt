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

const defaultValues = {
    taskTitle: "",
    room:"",
    assign:"",
    repeat: "",
    userDate: new Date(),
    taskDescription: "",
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

const backend_route ='api/tasks/';

function IndividualTask(props) {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formValues, setFormValues] = useState(defaultValues);

    const fetchData =  async (id) => {
        return await axios
        .get(backend_route + `/${id}`)
        .then((response) => {
            const taskData = response.data;
            return taskData;
        })
        .catch((err) => {
            return err;
        });
    };

    useEffect(() => {
        if (id) {
            async function fetchAndSet() {
                const taskData = await fetchData(id);
                setFormValues({
                    taskTitle: taskData['task_name'] ? taskData['task_name'] : '',
                    room: taskData['room'] ? taskData['room'] : '',
                    assign: taskData['assignee'] ? taskData['assignee'] : '',
                    repeat: taskData['repeat'] ? taskData['repeat'] : '',
                    userDate: taskData['due_time']['$date']['$numberLong'] ? new Date(taskData['due_time']['$date']['$numberLong']) : new Date(),
                    taskDescription: taskData['description'] ? taskData['description'] : '',
                    complete: taskData['complete'],
                });
            }
            fetchAndSet();
            return () => fetchAndSet();
        }
    });

    const handleNavigate = () => {
        return navigate(-1);
    }

    const handleInputChange = (e, date) => {
        if (e == null && date != null) {
            setFormValues({
                ...formValues,
                userDate: date['$d']
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
        console.log(formValues);
    };

    return (
        <>
            <Header />

            <ThemeProvider theme={theme}>
                <Box maxWidth='xs' sx={{ height: 70, mx: 3, pb: 0, display: 'flex', alignItems: 'flex-end' }}>
                    <Button onClick={handleNavigate} sx={{"&:hover": {color: 'rgb(74, 99, 24)', backgroundColor: "transparent", border: '0px #fff solid'}}} disableRipple disableElevation disableFocusRipple variant="text" startIcon={<ArrowBackIosIcon />}>
                        Back
                    </Button>
                </Box>
            </ThemeProvider>

            <form className='taskFormContainer' onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <Box sx={{m: 3, mt: 1, pt: 4, maxWidth: '100%'}}>
                        <TextField disabled={formValues['complete']} required sx={{mb: 2}} variant="standard" fullWidth id="taskTitle-input" name="taskTitle" label="Task Title" type="text" value={formValues.taskTitle} onChange={handleInputChange} />

                        <TextField disabled={formValues['complete']} value={formValues.taskDescription} sx={{mb: 2}} fullWidth required id="taskDescription" name='taskDescription' label="Enter Task Description" multiline rows={4} variant="standard" onChange={handleInputChange}/>
                        
                        <FormControl required variant="standard" sx={{mb: 2, width: '100%'}}>
                            <InputLabel id="room-label">Select Room</InputLabel>
                            <Select disabled={formValues['complete']} defaultValue={defaultValues.room} required name="room" labelId="room-label" id="room-select-helper" value={formValues.room} label="room" onChange={handleInputChange}>
                                {id ? <MenuItem value={`${formValues.room}`}>{`${formValues.room}`}</MenuItem> : ''}
                                <MenuItem value={'bathroom'}>Bathroom</MenuItem>
                                <MenuItem value={'kitchen'}>Kitchen</MenuItem>
                                <MenuItem value={'livingroom'}>Living Room</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl required variant="standard" sx={{mb: 2, width: '100%'}}>
                            <InputLabel id="assign-label">Assign To</InputLabel>
                            <Select disabled={formValues['complete']} required name="assign" labelId="assign-label" id="assign-select-helper" value={formValues.assign} label="assign" onChange={handleInputChange}>
                                {id ? <MenuItem value={`${formValues.assign}`}>{`${formValues.assign}`}</MenuItem> : ''}
                                <MenuItem value={'tom'}>Tom</MenuItem>
                                <MenuItem value={'james'}>James</MenuItem>
                                <MenuItem value={'aaron'}>Aaron</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl required variant="standard" sx={{mb: 2, width: '100%'}}>
                            <InputLabel id="repeat-label">Repeat Every</InputLabel>
                            <Select disabled={formValues['complete']} required name="repeat" labelId="repeat-label" id="repeat-select-helper" value={formValues.repeat} label="repeat" onChange={handleInputChange}>
                                {id ? <MenuItem value={formValues.repeat}>{`Every ${formValues.repeat} Day`}</MenuItem> : ''}
                                <MenuItem value={'never'}>Never</MenuItem>
                                <MenuItem value={'everyday'}>Every Day</MenuItem>
                                <MenuItem value={'everyweek'}>Every Week</MenuItem>
                                <MenuItem value={'every2week'}>Every 2 Weeks</MenuItem>
                                <MenuItem value={'everymonth'}>Every Month</MenuItem>
                                <MenuItem value={'everyyear'}>Every Year</MenuItem>
                            </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker disabled={formValues['complete']} value={dayjs(formValues.userDate)} required label="Select Date" sx={{mb: 2, width: '100%'}} slotProps={{ textField: { required: true, fullWidth: true } }} onChange={date => handleInputChange(null, date)} />
                        </LocalizationProvider>
                        
                        <Button disabled={formValues['complete']} sx={{"&:hover": {color: '#fff', border: '0px #fff solid'}}} variant="contained" fullWidth={true} endIcon={<LibraryAddIcon />} color="primary" type="submit">Save</Button>
                    </Box>
                </ThemeProvider>
            </form>
            <Footer />
        </>
    )
}

export default IndividualTask;