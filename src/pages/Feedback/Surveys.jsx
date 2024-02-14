import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../../global';
import http from '../../http';


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


            <Grid container spacing={2}>
                {
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">User ID</TableCell>
                                    <TableCell align="center">Survey ID</TableCell>
                                    <TableCell align="center">Rating</TableCell>
                                    <TableCell align="center">Ease</TableCell>
                                    <TableCell align="center">Booking</TableCell>
                                    <TableCell align="center">Comments</TableCell>
                                    <TableCell align="center">Submitted on</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {surveyList.map((survey, i) => (
                                    <TableRow key={survey.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{survey.id}</TableCell>
                                        <TableCell align="center">{survey.satisfaction}</TableCell>
                                        <TableCell align="center">{survey.ease}</TableCell>
                                        <TableCell align="center">{survey.booking}</TableCell>
                                        <TableCell align="center">{survey.comments}</TableCell>
                                        <TableCell align="center"> {dayjs(survey.createdAt).format(global.datetimeFormat)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Grid>



        </Box>
    )
}

export default Surveys