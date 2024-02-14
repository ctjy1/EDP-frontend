import React from 'react'
import { Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Paper } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import http from '../../http';



function AddTicket() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            issue: '', 
            issue_Description: '',
            issue_Status: 'Ongoing' 
        },
        validationSchema: yup.object({
            issue: yup.string().trim()
                .matches(/^[a-zA-Z0-9\s!@#$%^&*_+=\-|\\:;"',.<>?`~]+$/, 'Only alphanumeric characters are allowed')
                .max(100, 'Issue must be at most 100 characters')
                .required('Issue is required'),

            issue_Description: yup.string().trim()
                .matches(/^[a-zA-Z0-9\s!@#$%^&*_+=\-|\\:;"',.<>?`~]+$/, 'Only alphanumeric characters are allowed')
                .max(500, 'Description must be at most 500 characters')
                .required('Description is required'),
        }),
        onSubmit: (data) => {
            data.issue = data.issue.trim();
            data.issue_Description = data.issue_Description.trim();
            data.issue_Status = data.issue_Status.trim();
            http.post("/Cust_Ticket", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/ticket");
                })
                .catch((error) => {
                    // Handle the error
                    console.error('submission error', error);
                    // You can also show a user-friendly message to the user
                });
        }
    });

    return (<Box>
        <Box
            >
            <Typography variant="h3" sx={{ my: 2, textAlign: 'center', color: 'black'}}>
                <b>Ticket Issue Form</b>
            </Typography>
        </Box>

        <Box sx={{ mx: 'auto', width: 700, border: '1px solid #ccc', padding: 4, borderRadius: 4 }}>
            <Typography variant="h5" sx={{ my: 2, textAlign: 'center', color: 'black' }}>
                <b>Submit Issue</b>
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <TextField sx={{backgroundColor: "#fdcda9"}}
                    
                    fullWidth margin="dense" autoComplete="off"
                    label="Issue" 
                    name="issue"
                    value={formik.values.issue}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.issue && Boolean(formik.errors.issue)}
                    helperText={formik.touched.issue && formik.errors.issue}
                />
                <TextField sx={{backgroundColor: "#fdcda9"}}
                    fullWidth margin="dense" autoComplete="off"
                    multiline minRows={2}
                    label="Issue Description"
                    name="issue_Description"
                    value={formik.values.issue_Description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.issue_Description && Boolean(formik.errors.issue_Description)}
                    helperText={formik.touched.issue_Description && formik.errors.issue_Description}
                />

                


                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>
    </Box>)
}
export default AddTicket