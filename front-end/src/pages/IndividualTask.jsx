import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
};

const theme = createTheme({
    palette: {
      primary: {
        main: '#81b29a',
        contrastText: '#fff',
      },
    },
});

function IndividualTask(props) {
    const [formValues, setFormValues] = useState(defaultValues)

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
        <div>
            <Header />
            <form className='taskFormContainer' onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <Box sx={{m: 3, mt: 8, pt: 3, maxWidth: '100%'}}>
                        <TextField required sx={{mb: 2}} variant="standard" fullWidth id="taskTitle-input" name="taskTitle" label="Task Title" type="text" value={formValues.taskTitle} onChange={handleInputChange} />

                        <TextField sx={{mb: 2}} fullWidth required id="taskDescription" name='taskDescription' label="Enter Task Description" multiline rows={4} defaultValue={formValues.taskDescription} variant="standard" onChange={handleInputChange}/>
                        
                        <FormControl required variant="standard" sx={{mb: 2, width: '100%'}}>
                            <InputLabel id="room-label">Select Room</InputLabel>
                            <Select required name="room" labelId="room-label" id="room-select-helper" value={formValues.room} label="room" onChange={handleInputChange}>
                                <MenuItem value={'bathroom'}>Bathroom</MenuItem>
                                <MenuItem value={'kitchen'}>Kitchen</MenuItem>
                                <MenuItem value={'livingroom'}>Living Room</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl required variant="standard" sx={{mb: 2, width: '100%'}}>
                            <InputLabel id="assign-label">Assign To</InputLabel>
                            <Select required name="assign" labelId="assign-label" id="assign-select-helper" value={formValues.assign} label="assign" onChange={handleInputChange}>
                                <MenuItem value={'tom'}>Tom</MenuItem>
                                <MenuItem value={'james'}>James</MenuItem>
                                <MenuItem value={'aaron'}>Aaron</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl required variant="standard" sx={{mb: 2, width: '100%'}}>
                            <InputLabel id="repeat-label">Repeat Every</InputLabel>
                            <Select required name="repeat" labelId="repeat-label" id="repeat-select-helper" value={formValues.repeat} label="repeat" onChange={handleInputChange}>
                                <MenuItem value={'never'}>Never</MenuItem>
                                <MenuItem value={'everyday'}>Every Day</MenuItem>
                                <MenuItem value={'everyweek'}>Every Week</MenuItem>
                                <MenuItem value={'every2week'}>Every 2 Weeks</MenuItem>
                                <MenuItem value={'everymonth'}>Every Month</MenuItem>
                                <MenuItem value={'everyyear'}>Every Year</MenuItem>
                            </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker required label="Select Date" sx={{mb: 2, width: '100%'}} componentsProps={{ textField: { required: true, fullWidth: true } }} onChange={date => handleInputChange(null, date)} />
                        </LocalizationProvider>
                        
                        <Button variant="contained" fullWidth={true} endIcon={<LibraryAddIcon />} color="primary" type="submit">Save</Button>
                    </Box>
                </ThemeProvider>
            </form>

            <Footer />
        </div>
    )
}

export default IndividualTask;