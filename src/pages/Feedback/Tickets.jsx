import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Input, IconButton, Paper, Button } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import global from '../../global';
import http from '../../http';
import { useNavigate } from 'react-router-dom';

function Ticket() {
    const [ticketList, setTicketList] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getTicket = () => {
        http.get('/Cust_Ticket').then((res) => {
            setTicketList(res.data);
        });
    };

    const searchTicket = () => {
        http.get(`/Cust_Ticket?search=${search}`).then((res) => {
            setTicketList(res.data);
        });
    };

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchTicket();
        }
    };

    useEffect(() => {
        getTicket();
    }, []);

    const updateTicket = (id) => {
        navigate(`/updateTicket/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'Ticket ID', width: 150 },
        { field: 'issue', headerName: 'Issue', width: 200 },
        { field: 'issue_Description', headerName: 'Issue Description', width: 200 },
        { field: 'issue_Status', headerName: 'Issue Status', width: 150 },
        { field: 'createdAt', headerName: 'Created At', width: 200,
            valueFormatter: (params) => dayjs(params.value).format(global.datetimeFormat) },
        { field: 'updatedAt', headerName: 'Updated At', width: 200,
            valueFormatter: (params) => dayjs(params.value).format(global.datetimeFormat) },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => updateTicket(params.row.id)}
                >
                    Update
                </Button>
            ),
        },
    ];

    return (
        <div className="app">
            <main className="adminContent">
                <Box m="20px">
                    <Typography variant="h5" sx={{ my: 2 }}>
                        Ticket issues will be shown here
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Input value={search} placeholder="Search"
                            onChange={onSearchChange}
                            onKeyDown={onSearchKeyDown} />
                        <IconButton color="primary"
                            onClick={searchTicket} >
                            <Search />
                        </IconButton>
                        <IconButton color="primary"
                            onClick={() => {
                                setSearch('');
                                getTicket();
                            }}>
                            <Clear />
                        </IconButton>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper sx={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={ticketList}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5, 10, 20]}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </main>
        </div>
    );
}

export default Ticket;