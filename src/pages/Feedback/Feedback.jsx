import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Input,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';
import http from '../http';

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [search, setSearch] = useState('');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const [sortedField, setSortedField] = useState('id');

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getFeedback = () => {
    http.get('/Cust_Feedback').then((res) => {
      setFeedbackList(res.data);
    });
  };

  const searchFeedback = () => {
    http.get(`/Cust_Feedback?search=${search}`).then((res) => {
      setFeedbackList(res.data);
    });
  };

  const sortFeedback = (field) => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortedField(field);
    setSortDirection(direction);

    const sortedList = [...feedbackList].sort((a, b) => {
      if (direction === 'asc') {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });

    setFeedbackList(sortedList);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  useEffect(() => {
    http.get('/Cust_Feedback').then((res) => {
      setFeedbackList(res.data);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Feedback will be shown here
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Input
          value={search}
          placeholder="Search"
          onChange={onSearchChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchFeedback();
            }
          }}
        />
        <IconButton color="primary" onClick={searchFeedback}>
          <Search />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => {
            setSearch('');
            getFeedback();
          }}
        >
          <Clear />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        {
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" onClick={() => sortFeedback('id')}>
                    User ID
                  </TableCell>
                  <TableCell align="center" onClick={() => sortFeedback('id')}>
                    Feedback ID
                  </TableCell>
                  <TableCell align="center" onClick={() => sortFeedback('feedback_Type')}>
                    Feedback Type
                  </TableCell>
                  <TableCell align="center" onClick={() => sortFeedback('enquiry_Subject')}>
                    Subject
                  </TableCell>
                  <TableCell align="center" onClick={() => sortFeedback('customer_Enquiry')}>
                    Description
                  </TableCell>
                  <TableCell align="center" onClick={() => sortFeedback('createdAt')}>
                    Compliments
                  </TableCell>
                  <TableCell align="center" onClick={() => sortFeedback('createdAt')}>
                    Submitted on
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {feedbackList.map((feedback, i) => (
                  <TableRow
                    key={feedback.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">F{feedback.id}</TableCell>
                    <TableCell align="center">{feedback.feedback_Type}</TableCell>
                    <TableCell align="center">{feedback.enquiry_Subject}</TableCell>
                    <TableCell align="center">{feedback.customer_Enquiry}</TableCell>
                    <TableCell align="center">{feedback.compliments_Desc}</TableCell>
                    <TableCell align="center">{dayjs(feedback.createdAt).format(global.datetimeFormat)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Grid>
    </Box>
  );
}

export default Feedback;