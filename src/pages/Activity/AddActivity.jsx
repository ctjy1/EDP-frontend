import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl, InputLabel, FormHelperText, Select, MenuItem
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import http from "../../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import NavBar from "../Components/Navbar";

function AddActivity() {
  const navigate = useNavigate();

  // Counter for auto-incrementing activity_Id
  let activityIdCounter = 1;

  const formik = useFormik({
    initialValues: {
      activity_Id: 0, // Initialize with 0
      tag_Id: 0, // Initialize with 0
      activity_Name: "",
      tag_Name: "",
      activity_Desc: "",
      activity_price: 0,
      ImageFile: null,
    },
    validationSchema: yup.object({
      // Your validation schema
    }),
    onSubmit: (data) => {
      data.activity_Id = activityIdCounter++; // Auto-increment activity_Id
      data.tag_Id = activityIdCounter++; // Auto-increment tag_Id

      data.activity_Name = data.activity_Name.trim();
      data.tag_Name = data.tag_Name.trim();
      data.activity_price = data.activity_price;
      data.activity_Desc = data.activity_Desc;
      data.ImageFile = data.ImageFile;

      http.post("/Activity/AddActivity", data)
        .then((res) => {
          console.log(res.data);
          navigate("/ManageActivities");
        })
        .catch(function (err) {
          toast.error(`${err.response.data.message}`);
        });
    },
  });

  return (
      <Box sx={{ minHeight: '100vh', padding: '20px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h2" sx={{ my: 3, borderBottom: "3px solid orange", paddingBottom: "7px", color: 'red' }}>
                <strong>Add Activity</strong>
            </Typography>

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
                            <FormControl fullWidth margin="dense" error={formik.touched.activity_Name && Boolean(formik.errors.activity_Name)}
                                sx={{ backgroundColor: "#fdcda9" }}>
                                <InputLabel>

                                <Typography
                                     style={{
                                        color: "#1a1a1a"
                                    }}
                                 >
                                    Activity Names
                                </Typography>
                            </InputLabel>
                            <Select
                                label={
                                    <Typography
                                        style={{
                                            color: "#1a1a1a"                                            }}
                                    >
                                        Activity
                                    </Typography>
                                }
                                name="activity_Name"
                                variant="filled"
                                value={formik.values.activity_Name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                inputProps={{                                        style: {
                                        color: "black"
                                    },
                                }}
                            >
                                <MenuItem value={'High Tea Session'}>High Tea Session ($40)</MenuItem>
                                <MenuItem value={'Yacht Rental'}>Yacht Rental ($50)</MenuItem>
                                <MenuItem value={'SG Pub Crawls'}>SG Pub Crawls ($35)</MenuItem>
                                <MenuItem value={'Skating Lessons'}>Skating Lessons ($30)</MenuItem>
                            </Select>
                            <FormHelperText>
                                <Typography
                                    style={{
                                        color: "#1a1a1a"
                                    }}
                                >
                                    {formik.touched.activity_Name && formik.errors.activity_Name}
                                </Typography>
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                            <FormControl fullWidth margin="dense" error={formik.touched.tag_Name && Boolean(formik.errors.tag_Name)}
                                sx={{ backgroundColor: "#fdcda9" }}>
                                <InputLabel>

                                <Typography
                                     style={{
                                        color: "#1a1a1a"
                                    }}
                                 >
                                    Tag Names
                                </Typography>
                            </InputLabel>
                            <Select
                                label={
                                    <Typography
                                        style={{
                                            color: "#1a1a1a"                                            }}
                                    >
                                        Tag
                                    </Typography>
                                }
                                name="tag_Name"
                                variant="filled"
                                value={formik.values.tag_Name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                inputProps={{                                        
                                    style: {
                                        color: "black"
                                    },
                                }}
                            >
                                <MenuItem value={'High Tea Session'}>Indoors</MenuItem>
                                <MenuItem value={'Yacht Rental'}>Outdoors</MenuItem>
                            </Select>
                            <FormHelperText>
                                <Typography
                                    style={{
                                        color: "#1a1a1a"
                                    }}
                                >
                                    {formik.touched.tag_Name && formik.errors.tag_Name}
                                </Typography>
                            </FormHelperText>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12}>
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
                                    Activity Description
                                </Typography>
                            }
                            name="activity_Desc"
                            value={formik.values.activity_Desc}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.activity_Desc && Boolean(formik.errors.activity_Desc)}
                            helperText={formik.touched.activity_Desc && formik.errors.activity_Desc}
                            InputProps={{
                                style: {
                                    color: "black"
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        sx={{
                                backgroundColor: "#fdcda9",
                            }}
                            fullWidth margin="dense" autoComplete="off"
                            variant="filled"
                            label={
                                <Typography
                                    style={{
                                        color: "#1a1a1a"
                                    }}
                                >
                                    activity_price
                                </Typography>
                            }
                            name="activity_price"
                            type="number"
                            value={formik.values.activity_price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.activity_price && Boolean(formik.errors.activity_price)}
                            helperText={formik.touched.activity_price && formik.errors.activity_price}
                            InputProps={{
                                style: {
                                    color: "black"
                                },
                            }}
                        />
                    </Grid>
                            
                    <Grid item xs={12}>
                        <input
                            type="file"
                            onChange={(event) => formik.setFieldValue("ImageFile", event.target.files[0])}
                        />
                    </Grid>

                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                            <Button variant="contained" type="submit"
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
                                }}>
                                Add Activity
                            </Button>
                            <Button variant="contained"
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
                                }} onClick={() => navigate("/ManageActivities")}>
                                Go to Manage Activities
                            </Button>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default AddActivity;