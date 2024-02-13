import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { FormControl, InputLabel, FormHelperText, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';
import http from "../../http";
// npm install @mui/x-date-pickers

function AddReward() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            RewardName: "",
            Description: "",
            Quantity: 1,
            Discount: 0,
            PointsRequired: 0,
            ExpiryDate: dayjs().add(1, 'day')
        },
        validationSchema: yup.object({
            RewardName: yup.string().trim()
                .min(3, 'Reward Name must be at least 3 characters')
                .max(100, 'Reward Name must be at most 100 characters')
                .required('Reward Name is required'),
            Description: yup.string().trim()
                .min(3, 'Description must be at least 3 characters')
                .max(500, 'Description must be at most 500 characters')
                .required('Description is required'),
            Quantity: yup.number()
                .min(1)
                .required('Points is required'),
            Discount: yup.number().min(0).required('Discount is required'),
            PointsRequired: yup.number().min(0).required('Points Required is required'),
            ExpiryDate: yup.date().typeError('Invalid date').required('Expiry Date is required')
        }),
        onSubmit: async (data) => {
            data.RewardName = data.RewardName.trim();
            data.Description = data.Description.trim();
            data.Quantity = data.Quantity;
            data.Discount = data.Discount;
            data.PointsRequired = data.PointsRequired;
            data.ExpiryDate = data.ExpiryDate;

            try {
                const rewards = [];
                for (let i = 0; i < data.Quantity; i++) {
                    const result = await http.post("/reward", data);
                    rewards.push(result.data); // Store each created reward in an array
                }
                console.log(rewards);
                navigate("/manageRewards");
            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <Box sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <Typography variant="h5" 
            sx={{ my: 3, borderBottom: "3px solid orange", paddingBottom: "7px", color: 'red' }}>
                Add Reward
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
                          Reward Name
                        </Typography>
                      }
                    name="RewardName"
                    value={formik.values.RewardName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.RewardName && Boolean(formik.errors.RewardName)}
                    helperText={formik.touched.RewardName && formik.errors.RewardName}
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
                    name="Description"
                    value={formik.values.Description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.Description && Boolean(formik.errors.Description)}
                    helperText={formik.touched.Description && formik.errors.Description}
                />
                <TextField type={"number"}
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
                          Quantity
                        </Typography>
                      }
                    name="Quantity"
                    value={formik.values.Quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.Quantity && Boolean(formik.errors.Quantity)}
                    helperText={formik.touched.Quantity && formik.errors.Quantity}
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
                    name="Discount"
                    value={formik.values.Discount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.Discount && Boolean(formik.errors.Discount)}
                    helperText={formik.touched.Discount && formik.errors.Discount} />
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
                    name="PointsRequired"
                    value={formik.values.PointsRequired}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.PointsRequired && Boolean(formik.errors.PointsRequired)}
                    helperText={formik.touched.PointsRequired && formik.errors.PointsRequired} />

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
                    name="ExpiryDate"
                    InputLabelProps={{
                        shrink: true
                    }}
                    value={formik.values.ExpiryDate}
                    onChange={formik.handleChange}
                    format = "dd-mm-yyyy"
                    error={formik.touched.ExpiryDate && Boolean(formik.errors.ExpiryDate)}
                    helperText={formik.touched.ExpiryDate && formik.errors.ExpiryDate}
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Add Reward
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AddReward;