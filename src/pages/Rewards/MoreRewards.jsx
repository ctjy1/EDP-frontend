import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography, Grid, Input, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from "../../http";
import UserContext from '../../contexts/UserContext';
import dayjs from 'dayjs';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function MoreRewards() {
    const [reward, setReward] = useState(null);
    const [rewardList, setRewardList] = useState([]);
    const [search, setSearch] = useState('');
    const { id } = useParams();
    const { user } = useContext(UserContext);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const searchRewards = () => {
        http.get(`/reward?search=${search}`).then((res) => {
            setRewardList(res.data);
        });
    };

    useEffect(() => {
        http.get(`/reward/${id}/similar_rewards`).then((res) => {
            setRewardList(res.data);
            const rewards = res.data; 
            const selectedReward = rewards.find((reward) => reward.id === Number(id));
            if (selectedReward) {
                setReward(selectedReward);
            }
        });
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchRewards();
        }
    };

    const onClickSearch = () => {
        searchRewards();
    }

    const onClickClear = () => {
        setSearch('');
        getRewardData();
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            {reward && (
                <Typography variant="h3" sx={{ my: 2 }} style={{ textAlign: "center" }}>
                    Reward: {reward.rewardName}
                </Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="contained"
                    component={Link} to="/rewards"
                    sx={{
                        bgcolor: 'transparent', // Set background color to transparent
                        color: 'black', // Set font color to white
                        '&:hover': {
                            bgcolor: 'transparent', // Set background color to transparent on hover
                        },
                    }}>
                    Back
                </Button>
            </Box>


            <Grid container spacing={2}>
                {
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">ID</TableCell>
                                    <TableCell align="center">Points Required</TableCell>
                                    <TableCell align="center">Date of Expiry</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">Redeemed At</TableCell>
                                    <TableCell align="center">Redeemed By</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rewardList.map((reward, i) => (
                                        <TableRow
                                            key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{reward.id}</TableCell>
                                            <TableCell align="center">{reward.pointsRequired}</TableCell>
                                            <TableCell align="center">{dayjs(reward.expiryDate).format("YYYY-MM-DD")}</TableCell>
                                            <TableCell align="center">{reward.description}</TableCell>
                                            <TableCell align="center">{reward.redeemedAt ? dayjs(reward.redeemedAt).format("YYYY-MM-DD"): "N/A"}</TableCell>
                                            <TableCell align="center">{reward.redeemedAt ? reward.redeemedBy : "N/A"}</TableCell>
                                            <TableCell align="right">
                                            {user && user.id === reward.userId && (
                                                <Link to={`/editreward/${reward.id}`}>
                                                    <Button variant="contained">
                                                        Update
                                                    </Button>
                                                </Link>
                                            )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Grid>
        </Box>
    );
}

export default MoreRewards;