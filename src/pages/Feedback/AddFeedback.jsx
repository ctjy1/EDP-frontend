import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, SnackbarContent, Select, MenuItem, InputLabel, FormControl,  Paper } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import http from '../../http';


// import contactUsImage from '../images/ada.jpg';

function AddFeedback() {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const formik = useFormik({
        initialValues: {
            feedback_Type: 'feedback', //add to vs 
            enquiry_Subject: "",
            customer_Enquiry: "",
            compliments_Desc: ""
        },
        validationSchema: yup.object({
            feedback_Type: yup.string()
                .required('Feedback type is required'),

            enquiry_Subject: yup.string().trim()
                .matches(/^[a-zA-Z0-9\s!@#$%^&*_+=\-|\\:;"',.<>?`~]+$/, 'Only alphanumeric characters are allowed')
                .max(500, 'Subject must be at most 500 characters')
                .required('Subject is required'),

            customer_Enquiry: yup.string().trim()
                .matches(/^[a-zA-Z0-9\s!@#$%^&*_+=\-|\\:;"',.<>?`~]+$/, 'Only alphanumeric characters are allowed')
                .max(500, 'Description must be at most 500 characters')
                .required('Description is required'),

            compliments_Desc: yup.string().trim()
                .matches(/^[a-zA-Z0-9\s!@#$%^&*_+=\-|\\:;"',.<>?`~]+$/, 'Only alphanumeric characters are allowed')
                .max(500, 'Description must be at most 500 characters')
        }),
        onSubmit: (data) => {
            data.enquiry_Subject = data.enquiry_Subject.trim();
            data.customer_Enquiry = data.customer_Enquiry.trim();
            if (data.feedback_Type === 'compliments') {
                data.compliments_Desc = data.compliments_Desc.trim();
            } else {
                delete data.compliments_Desc;
            }

            http.post("/Cust_Feedback", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/feedback");
                });

        }
    });

    const showComplimentsField = formik.values.feedback_Type === 'compliments';
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
        navigate('/feedback');
      };
    

    return (
        <Box sx={{ minHeight: '100vh', padding: '20px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h2" sx={{ my: 3, borderBottom: "3px solid orange", paddingBottom: "7px", color:'red'}}>
                <strong>Feedback Form</strong>
            </Typography>
            <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', color: 'black' }}>
                <h2>Contact Information</h2>
                <h3>Address</h3>

                <p> NTUC Club - UPlay <br />
                    Market Square @ Downtown East <br />
                    E!Avenue, Level 3 <br />
                    1 Pasir Ris Close<br />
                    Singapore 519599
                </p>
            </div>

            <Box sx={{ mx: 'auto', width: 700, border: '1px solid #ccc', padding: 4, borderRadius: 4 }}>
                <Typography variant="h5" sx={{ my: 2, textAlign: 'center', color: 'black'}}>
                    <b>Give us your feedback!</b>
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit}>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        
                        <InputLabel htmlFor="feedback_Type">What can we help you with?</InputLabel>
                   
                    
                        <Select
                        sx= {{backgroundColor: "#fdcda9"}}
                            label="Feedback Type"
                            name="feedback_Type"
                            value={formik.values.feedback_Type || ''}  // Ensure it's not undefined
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

                    <TextField
                    
                    sx= {{backgroundColor: "#fdcda9"}}
                        fullWidth margin="dense" autoComplete="off"
                        label="Subject"
                        name="enquiry_Subject"
                        value={formik.values.enquiry_Subject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.enquiry_Subject && Boolean(formik.errors.enquiry_Subject)}
                        helperText={formik.touched.enquiry_Subject && formik.errors.enquiry_Subject}
                    />
                    <TextField
                    sx= {{backgroundColor: "#fdcda9"}}
                        fullWidth margin="dense" autoComplete="off"
                        multiline minRows={2}
                        label="General Enquiries / Feedback"
                        name="customer_Enquiry"
                        value={formik.values.customer_Enquiry}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.customer_Enquiry && Boolean(formik.errors.customer_Enquiry)}
                        helperText={formik.touched.customer_Enquiry && formik.errors.customer_Enquiry}
                    />

                    {showComplimentsField && (
                        <TextField
                        TextField
                    sx= {{backgroundColor: "#fdcda9"}}
                            fullWidth margin="dense" autoComplete="off"
                            label="Compliments"
                            name="compliments_Desc"
                            value={formik.values.compliments_Desc}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.compliments_Desc && Boolean(formik.errors.compliments_Desc)}
                            helperText={formik.touched.compliments_Desc && formik.errors.compliments_Desc}
                        />
                    )}


                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button variant="contained" type="submit">
                            Add
                        </Button>
                    </Box>
                </Box>
                <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                    >
                        <SnackbarContent
                            message="Feedback submitted successfully!"
                            action={
                                <Button color="inherit" size="small" onClick={handleSnackbarClose}>
                                    Close
                                </Button>
                            }
                        />
                    </Snackbar>
            </Box>
        </Box>
    )
}

export default AddFeedback