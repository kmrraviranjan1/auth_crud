import React from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CourseForm = () => {
    return (
        <Stack spacing={3} width={400} margin='auto'>
            <Typography variant="h6"> Fill up the Course Details </Typography>

            <TextField id="filled-basic" label="Ttile" variant="outlined" />
            <TextField id="outlined-multiline-static" label="Description" multiline rows={3} />
            <TextField id="filled-basic" label="Batch size" variant="outlined" type='number' />
            <TextField id="filled-basic" label="Start Date" variant="outlined" type="date" value={new Date()} />
            <TextField id="filled-basic" label="End Date" variant="outlined" type="date" value={new Date()} />

            <Button variant="contained" color="success"> Add Course </Button>
        </Stack>
    )
}

export default CourseForm