import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  SnackbarContent,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import http from '../http';


function AddSurvey() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      satisfaction: '',
      ease: '',
      booking: '',
      comments: '',
    },
    validationSchema: yup.object({
      satisfaction: yup
        .string()
        .required('Rating is required'),
      ease: yup
        .string()
        .required('Rating is required'),
      booking: yup
        .string()
        .required('Rating is required'),
      comments: yup
        .string()
        .trim()
        .min(1)
        .max(500, 'Comments must be at most 500 characters')
        .optional(),
    }),
    onSubmit: (data) => {
      data.satisfaction = String(data.satisfaction).trim();
      data.ease = String(data.ease).trim();
      data.booking = String(data.booking).trim();
      data.comments = String(data.comments).trim();
      http.post('/Cust_Survey', data).then((res) => {
        console.log(res.data);
        setOpenSnackbar(true);
      });
    },
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    navigate('/surveys');
  };

  return (
    <Box sx={{ minHeight: '100vh', padding: '20px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h2" sx={{ my: 3, borderBottom: "3px solid orange", paddingBottom: "7px" }}>
        <strong>Survey</strong>
      </Typography>
      <Box
        border="1px solid #ccc"
        borderRadius="8px"
        p={4}
        mx="auto"
        maxWidth="700px"
        mt={3}>

        <Box component="form" onSubmit={formik.handleSubmit} >
          <FormControl component="fieldset" >
            <FormLabel>How satisfied were you with your booking experience on our website?</FormLabel>
            <RadioGroup
              row
              name="satisfaction"
              value={formik.values.satisfaction}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value="Very Dissatisfied" control={<Radio />} label="Very Dissatisfied" />
              <FormControlLabel value="Dissatisfied" control={<Radio />} label="Dissatisfied" />
              <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
              <FormControlLabel value="Satisfied" control={<Radio />} label="Satisfied" />
              <FormControlLabel value="Very Satisfied" control={<Radio />} label="Very Satisfied" />
            </RadioGroup>
            {formik.touched.satisfaction && formik.errors.satisfaction && (
              <Typography color="error">{formik.errors.satisfaction}</Typography>
            )}

            <FormLabel>How easy was it to find what you were looking for on our website?</FormLabel>
            <RadioGroup
              row
              name="ease"
              value={formik.values.ease}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value="Very Difficult" control={<Radio />} label="Very Difficult" />
              <FormControlLabel value="Difficult" control={<Radio />} label="Difficult" />
              <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
              <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
              <FormControlLabel value="Very Easy" control={<Radio />} label="Very Easy" />
            </RadioGroup>
            {formik.touched.ease && formik.errors.ease && (
              <Typography color="error">{formik.errors.ease}</Typography>
            )}

            <FormLabel>How would you rate the booking process?</FormLabel>
            <RadioGroup
              row
              name="booking"
              value={formik.values.booking}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value="Very Bad" control={<Radio />} label="Very Bad" />
              <FormControlLabel value="Bad" control={<Radio />} label="Bad" />
              <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
              <FormControlLabel value="Good" control={<Radio />} label="Good" />
              <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
            </RadioGroup>
            {formik.touched.booking && formik.errors.booking && (
              <Typography color="error">{formik.errors.booking}</Typography>
            )}
          </FormControl>
          <p>Comments</p>
          <TextField
            fullWidth
            margin="dense"
            autoComplete="off"
            multiline
            minRows={2}
            label="Comments"
            name="comments"
            value={formik.values.comments}
            onChange={formik.handleChange}
            error={formik.touched.comments && Boolean(formik.errors.comments)}
            onBlur={formik.handleBlur}
            helperText={formik.touched.comments && formik.errors.comments}
          />
          <Box sx={{ mt: 2 }}>
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
            message="Survey submitted successfully!"
            action={
              <Button color="inherit" size="small" onClick={handleSnackbarClose}>
                Close
              </Button>
            }
          />
        </Snackbar>
      </Box>
    </Box>
  );
}

export default AddSurvey;