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

function EditActivity() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState({
        activity_Name: "",
        activity_Desc: "",
        activity_price: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        http.get(`/activity/${id}`).then((res) => {
            setActivity(res.data);
            setLoading(false);
        });
    }, []);

    const formik = useFormik({
        initialValues: activity,
        enableReinitialize: true,
        validationSchema: yup.object({
            activity_Name: yup.string().trim()
                .min(3, 'activity Name must be at least 3 characters')
                .max(100, 'activity Name must be at most 100 characters')
                .required('activity Name is required'),
            activity_Desc: yup.string().trim()
                .min(3, 'Description must be at least 3 characters')
                .max(500, 'Description must be at most 500 characters')
                .required('Description is required'),
            activity_price: yup.number().min(0).required('price is required')
        }),
        onSubmit: (data) => {
            data.activity_Name = data.activity_Name.trim();
            data.activity_Desc = data.activity_Desc.trim();
            data.activity_price = data.activity_price;
            http.put(`/activity/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate(`/manageActivities`);
                });
        }
    });

    const handleDateChange = (date) => {
      formik.setFieldValue('expiryDate', date.format('YYYY-MM-DD'));
  };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteActivity = () => {
        http.delete(`/activity/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/manageActivities");
            });
    }

    return (
      <Box sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Typography variant="h5" 
        sx={{ my: 3, borderBottom: "3px solid orange", paddingBottom: "7px", color: 'red' }}>
            Edit activity
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: "500px" }}>
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
                      Activity Name
                    </Typography>
                  }
                name="activity_Name"
                value={formik.values.activity_Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.activity_Name && Boolean(formik.errors.activity_Name)}
                helperText={formik.touched.activity_Name && formik.errors.activity_Name}
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
                name="activity_Desc"
                value={formik.values.activity_Desc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.activity_Desc && Boolean(formik.errors.activity_Desc)}
                helperText={formik.touched.activity_Desc && formik.errors.activity_Desc}
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
                name="activity_price"
                value={formik.values.activity_price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.activity_price && Boolean(formik.errors.activity_price)}
                helperText={formik.touched.activity_price && formik.errors.activity_price} />
            
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" type="submit">
                    Update Activity
                </Button>
            </Box>
        </Box>
    </Box>
    );
}

export default EditActivity;