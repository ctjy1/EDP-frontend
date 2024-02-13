import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Input, IconButton, Paper } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import global from '../global';
import http from '../http';

function FeedbackSidebar() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [search, setSearch] = useState('');
  const [sortModel, setSortModel] = useState([{ field: 'id', sort: 'asc' }]);

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

  useEffect(() => {
    getFeedback();
  }, []);

  useEffect(() => {
    http.get('/Cust_Feedback').then((res) => {
      setFeedbackList(res.data);
    });
  }, []);

  const columns = [
    { field: 'id', headerName: 'Feedback ID', flex: 1 },
    { field: 'feedback_Type', headerName: 'Feedback Type', flex: 1 },
    { field: 'enquiry_Subject', headerName: 'Subject', flex: 1 },
    { field: 'customer_Enquiry', headerName: 'Description', flex: 1 },
    { field: 'compliments_Desc', headerName: 'Compliments', flex: 1 },
    { field: 'createdAt', headerName: 'Submitted on', flex: 1, valueFormatter: (params) => dayjs(params.value).format(global.datetimeFormat) }
  ];

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
        <Grid item xs={12}>
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={feedbackList}
              columns={columns}
              sortingOrder={['asc', 'desc']}
              sortModel={sortModel}
              onSortModelChange={(newModel) => setSortModel(newModel)}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FeedbackSidebar;