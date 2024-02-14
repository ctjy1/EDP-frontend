import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../../global';
import http from '../../http';
import { DataGrid } from '@mui/x-data-grid';

function Surveys() {
    const [surveyList, setSurveyList] = useState([]);
    const [search, setSearch] = useState('');

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getSurveys = () => {
        http.get('/Cust_Survey').then((res) => {
            setSurveyList(res.data);
        });
    };

    const searchSurveys = () => {
        http.get(`/Cust_Survey?search=${search}`).then((res) => {
            setSurveyList(res.data);
        });
    };

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchSurveys();
        }
    };
    const onClickSearch = () => {
        searchSurveys();
    }
    const onClickClear = () => {
        setSearch('');
        getSurveys();
    };

    useEffect(() => {
        http.get('/Cust_Survey').then((res) => {
            console.log(res.data);
            setSurveyList(res.data);
        });
    }, []);

    const columns = [
        { field: 'id', headerName: 'Survey ID', width: 130 },
        { field: 'satisfaction', headerName: 'Rating', width: 130 },
        { field: 'ease', headerName: 'Ease', width: 130 },
        { field: 'booking', headerName: 'Booking', width: 130 },
        { field: 'comments', headerName: 'Comments', width: 200 },
        { field: 'createdAt', headerName: 'Submitted on', width: 180, renderCell: (params) => dayjs(params.value).format(global.datetimeFormat) },
    ];

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Surveys will be shown here.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary"
                    onClick={onClickSearch} >
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
            </Box>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={surveyList}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </Box>
    );
}

export default Surveys;
