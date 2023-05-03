import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import MoodIcon from '@mui/icons-material/Mood';
import MoodBadIcon from '@mui/icons-material/MoodBad';

export default function IconAvatars(props) {
    if (props.goodMember) {
        return (
            <Avatar sx={{ bgcolor: props.color }}>
                <MoodIcon />
            </Avatar>
        );
    }
    else {
        return (<Avatar sx={{ bgcolor: props.color }}>
                    <MoodBadIcon />
                </Avatar>
        );
    }
}