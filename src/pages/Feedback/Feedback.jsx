import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Input,
  IconButton,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../../global';
import http from '../../http';
import { DataGrid } from '@mui/x-data-grid';

function Feedback() {
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

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
    const field = newModel[0].field;
    const direction = newModel[0].sort === 'asc' ? 'asc' : 'desc';

    const sortedList = [...feedbackList].sort((a, b) => {
      if (direction === 'asc') {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });

    setFeedbackList(sortedList);
  };

  const columns = [
    { field: 'id', headerName: 'Feedback ID', width: 130 },
    { field: 'feedback_Type', headerName: 'Feedback Type', width: 150 },
    { field: 'enquiry_Subject', headerName: 'Subject', width: 200 },
    { field: 'customer_Enquiry', headerName: 'Description', width: 300 },
    { field: 'compliments_Desc', headerName: 'Compliments', width: 200 },
    { field: 'createdAt', headerName: 'Submitted on', width: 180, renderCell: (params) => dayjs(params.value).format(global.datetimeFormat) },
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

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={feedbackList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
        />
      </div>
    </Box>
  );
}

export default Feedback;
