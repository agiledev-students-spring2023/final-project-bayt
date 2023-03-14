import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import '../css/IndividualTask.css';

function IndividualTask(props) {
    return (
        <>
            {/* <div className='header'>
                <h1>Header</h1>
            </div> */}

            <Container maxWidth="false" disableGutters="false">
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
            </Container>
        </>
    )
}

export default IndividualTask;