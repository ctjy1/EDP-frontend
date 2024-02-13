import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl } from '@mui/material';
import http from "../../http";
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';
// npm install @mui/x-date-pickers
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function EditReward() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [reward, setReward] = useState({
        rewardName: "",
        description: "",
        discount: 0,
        pointsRequired: 0,
        expiryDate: dayjs().add(1, 'day')
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        http.get(`/reward/${id}`).then((res) => {
            setReward(res.data);
            setLoading(false);
        });
    }, []);

    const formik = useFormik({
        initialValues: reward,
        enableReinitialize: true,
        validationSchema: yup.object({
            rewardName: yup.string().trim()
                .min(3, 'Reward Name must be at least 3 characters')
                .max(100, 'Reward Name must be at most 100 characters')
                .required('Reward Name is required'),
            description: yup.string().trim()
                .min(3, 'Description must be at least 3 characters')
                .max(500, 'Description must be at most 500 characters')
                .required('Description is required'),
            discount: yup.number().min(0).required('Discount is required'),
            pointsRequired: yup.number().min(0).required('Points Required is required'),
            expiryDate: yup.date().typeError('Invalid date').required('Date is required')
        }),
        onSubmit: (data) => {
            data.rewardName = data.rewardName.trim();
            data.description = data.description.trim();
            data.discount = data.discount;
            data.pointsRequired = data.pointsRequired;
            data.expiryDate = data.expiryDate;
            http.put(`/reward/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate(`/manageMoreRewards/${id}`);
                });
        }
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteReward = () => {
        http.delete(`/reward/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/manageRewards");
            });
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Reward
            </Typography>
            {
                !loading && (
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <TextField
                            InputProps={{
                                style: { border: '2px solid #ccc', color: "black" }, // Apply border to input element
                              }}
                            fullWidth margin="dense" autoComplete="off"
                            label={
                                <Typography
                                  style={{
                                    color: "#1a1a1a",
                                  }}
                                >
                                  Reward Name
                                </Typography>
                              }
                            name="rewardName"
                            value={formik.values.rewardName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.rewardName && Boolean(formik.errors.rewardName)}
                            helperText={formik.touched.rewardName && formik.errors.rewardName}
                        />
                        <TextField
                            InputProps={{
                                style: { border: '2px solid #ccc', color: "black" }, // Apply border to input element
                              }}
                                fullWidth margin="dense" autoComplete="off"
                                multiline minRows={2}
                                label={
                                    <Typography
                                      style={{
                                        color: "#1a1a1a",
                                      }}
                                    >
                                      Description
                                    </Typography>
                                  }
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <TextField
                            InputProps={{
                                style: { border: '2px solid #ccc', color: "black" }, // Apply border to input element
                              }}
                                fullWidth margin="dense" autoComplete="off"
                                type="number"
                                inputProps={{
                                    min: 0,
                                    step: 0.1,
                                }}
                                label={
                                    <Typography
                                      style={{
                                        color: "#1a1a1a",
                                      }}
                                    >
                                      Discount
                                    </Typography>
                                  }
                            name="discount"
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.discount && Boolean(formik.errors.discount)}
                            helperText={formik.touched.discount && formik.errors.discount} />
                        <TextField
                            InputProps={{
                                style: { border: '2px solid #ccc', color: "black" }, // Apply border to input element
                              }}
                                fullWidth margin="dense" autoComplete="off"
                                type="number"
                                inputProps={{
                                    min: 0,
                                    step: 0.1,
                                }}
                                label={
                                    <Typography
                                      style={{
                                        color: "#1a1a1a",
                                      }}
                                    >
                                      Points Required 
                                    </Typography>
                                  }
                            name="pointsRequired"
                            value={formik.values.pointsRequired}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pointsRequired && Boolean(formik.errors.pointsRequired)}
                            helperText={formik.touched.pointsRequired && formik.errors.pointsRequired} />

                        <TextField type={"date"}
                            InputProps={{
                                style: { border: '2px solid #ccc', color: "black" }, // Apply border to input element
                              }}
                            fullWidth margin="normal" autoComplete="off"
                            label={
                                <Typography
                                  style={{
                                    color: "#1a1a1a",
                                  }}
                                >
                                  Date of Expiry
                                </Typography>
                              }
                            name="expiryDate"
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={formik.values.expiryDate}
                            onChange={formik.handleChange}
                            format="dd-mm-yyyy"
                            error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                            helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" type="submit">
                                Update
                            </Button>
                            <Button variant="contained" sx={{ ml: 2 }} color="error"
                                onClick={handleOpen}>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                )
            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Reward
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this reward?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={deleteReward}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default EditReward;