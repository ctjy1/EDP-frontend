import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../../http';

function AddTicket() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            issue: '', 
            issue_Description: '',
            issue_Status: 'Pending' 
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

    return (
        <Box sx={{ minHeight: '100vh', padding: '20px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h2" sx={{ my: 3, borderBottom: "3px solid orange", paddingBottom: "7px", color: 'red' }}>
                <strong>Ticket Issue Form</strong>
            </Typography>
            <Typography variant="h5" sx={{ my: 2, textAlign: 'center' }}>
                <b>Submit Issue</b>
            </Typography>

            <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                <h2>Contact Information</h2>
                <h3>Address</h3>

                <p> NTUC Club - UPlay <br />
                    Market Square @ Downtown East <br />
                    E!Avenue, Level 3 <br />
                    1 Pasir Ris Close<br />
                    Singapore 519599
                </p>
            </div>


            <Box
                border="1px solid #ccc"
                borderRadius="8px"
                p={4}
                mx="auto"
                maxWidth="600px"
                mt={3}
            >
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel htmlFor="feedback_Type">What can we help you with?</InputLabel>
                                <Select
                                    label="Feedback Type"
                                    name="feedback_Type"
                                    value={formik.values.feedback_Type || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.feedback_Type && Boolean(formik.errors.feedback_Type)}
                                    fullWidth
                                >
                                    <MenuItem value="enquiry">Enquiry</MenuItem>
                                    <MenuItem value="feedback">Feedback</MenuItem>
                                    <MenuItem value="compliments">Compliments</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    autoComplete="off"
                                    label="Subject"
                                    name="enquiry_Subject"
                                    value={formik.values.enquiry_Subject}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.enquiry_Subject && Boolean(formik.errors.enquiry_Subject)}
                                    helperText={formik.touched.enquiry_Subject && formik.errors.enquiry_Subject}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    autoComplete="off"
                                    multiline
                                    minRows={2}
                                    label="General Enquiries / Feedback"
                                    name="customer_Enquiry"
                                    value={formik.values.customer_Enquiry}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.customer_Enquiry && Boolean(formik.errors.customer_Enquiry)}
                                    helperText={formik.touched.customer_Enquiry && formik.errors.customer_Enquiry}
                                />
                            </FormControl>

                            {showComplimentsField && (
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        margin="dense"
                                        autoComplete="off"
                                        label="Compliments"
                                        name="compliments_Desc"
                                        value={formik.values.compliments_Desc}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.compliments_Desc && Boolean(formik.errors.compliments_Desc)}
                                        helperText={formik.touched.compliments_Desc && formik.errors.compliments_Desc}
                                    />
                                </FormControl>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    width: '200px',
                                    backgroundColor: '#fe9e0d',
                                    padding: "0.6rem 0rem",
                                    outline: "none",
                                    border: "none",
                                    color: '#FFFFFF',
                                    cursor: "pointer",
                                    fontWeight: 600,
                                    transition: "0.2s",
                                }}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default AddTicket;
