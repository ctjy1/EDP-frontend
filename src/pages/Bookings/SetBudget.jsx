import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../../http';

function SetBudget() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            budget: "",
        },
        validationSchema: yup.object({
            budget: yup.number()
                .integer('Please enter an integer value')
                .min(1, 'Budget must be at least 1')
                .required('Budget is required'),
        }),
        onSubmit: (data) => {
            data.budget = data.budget;

            http.post("/budget", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/addcart");
                })
        }
    });

    return (
        <Box>
            <Typography variant="h2" sx={{ my: 3, color: 'red' }}>
                <strong>Set Overall Budget</strong>
            </Typography>

            <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                    sx={{ backgroundColor: "#fdcda9" }}
                    fullWidth margin="dense" autoComplete="off"
                    variant="filled"
                    label={
                        <Typography
                            style={{
                                color: "#1a1a1a"
                            }}
                        >
                            Enter Budget
                        </Typography>
                    }
                    name="budget"
                    type="number"
                    value={formik.values.budget}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.budget && Boolean(formik.errors.budget)}
                    helperText={formik.touched.budget && formik.errors.budget}
                    InputProps={{
                        style: {
                            color: "black"
                        },
                    }}
                />

                <Button variant="contained" type="submit" sx={{
                    mt: 1,
                    width: '200px',
                    backgroundColor: '#fe9e0d',
                    padding: "0.6rem 0rem",
                    outline: "none",
                    border: "none",
                    color: '#FFFFFF',
                    cursor: "pointer",
                    fontWeight: 600,
                    transition: "0.2s",
                }}>
                    Set Budget
                </Button>
            </Box>


        </Box>

    );
}

export default SetBudget