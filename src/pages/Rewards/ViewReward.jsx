import React, { useEffect, useState, useContext } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Input,
    IconButton,
    Button,
    Snackbar,
    SnackbarContent,
    ThemeProvider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Clear } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from "../../http";
import SearchIcon from "@mui/icons-material/Search";
import UserContext from '../../contexts/UserContext';
import Navbar from '../Components/Navbar';
import { ColorModeContext, useMode } from '../../themes/MyTheme';
import CustomProgressBar from '../Components/ProgressBar/CustomProgressBar';

function ViewRewards() {
    const [rewardList, setRewardList] = useState([]);
    const [search, setSearch] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [selectedReward, setSelectedReward] = useState(null);
    const [redeemedrewardList, setRedeemedRewardList] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredCardRedeemed, setHoveredCardRedeemed] = useState('');
    const [hasRentalData, setHasRentalData] = useState(false);
    const [theme, colorMode] = useMode();
    const navigate = useNavigate();

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getRewards = () => {
        http.get('/reward').then((res) => {
            console.log("USER'S POINTS", user.points);
            const rewards = res.data;

            const unredeemedRewards = rewards.filter((reward) => reward.redeemedAt === null);

            setRewardList(unredeemedRewards);
        });
    };

    const getRedeemedRewards = () => {
        if (!user || !user.id) {
            console.log("this is the user:", user);
            return;
        }

        http.get(`/reward/redemptions`).then((res) => {
            setRedeemedRewardList(res.data);
        });
    };

    const redeemReward = (selectedReward) => {
        http.put(`/reward/${selectedReward.id}/redeem`, selectedReward)
            .then((res) => {
                console.log("here is the data", res.data);
                setUser({ ...user, points: res.data.updatedPoints });
                handleClose();
                showSnackbar();
            })
            .catch((error) => {
                console.error(error);
                handleClose();
            });
    };

    const groupRewardsByCreatedAt = (rewards) => {
        const groupedRewards = rewards.reduce((acc, reward) => {
            const existingGroup = acc.find(group => group.createdAt === reward.createdAt);
            if (existingGroup) {
                existingGroup.rewards.push(reward);
            } else {
                acc.push({ createdAt: reward.createdAt, rewards: [reward] });
            }
            return acc;
        }, []);
        return groupedRewards;
    };

    const searchRewards = () => {
        http.get(`/reward?search=${search}`).then((res) => {
            setRewardList(res.data);
        });
    };

    // Group the rewards by name
    const groupedRewards = groupRewardsByCreatedAt(rewardList);

    // Convert the grouped rewards object into an array of arrays
    const groupedRewardsArray = Object.values(groupedRewards);

    const groupedRedeemedRewards = groupRewardsByCreatedAt(redeemedrewardList);

    const groupedRedeemedRewardsArray = Object.values(groupedRedeemedRewards);
    console.log("grouped redeemed rewards", groupedRedeemedRewardsArray);

    useEffect(() => {
        const fetchData = () => {
            if (user) {
                getRedeemedRewards();
                getRewards();
            }
        };
        fetchData();

        const rentalData = JSON.parse(localStorage.getItem('rentalData'));
        if (rentalData) {
            setHasRentalData(true);
        }
    }, [user]);

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
        getRewards();
    };

    const [open, setOpen] = useState(false);

    const handleOpen = (reward) => {
        console.log("this is the reward", reward);
        setSelectedReward(reward);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const showSnackbar = () => {
        setSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
          <Navbar />
            <Box>
            {/* Snackbar for successful redemption */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Adjust the duration as needed
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Set the anchor origin to top-center
            >
                <SnackbarContent
                    message={
                        <Box display="flex" alignItems="center">
                            <CheckCircleOutlineIcon sx={{ marginRight: '8px' }} />
                            Reward successfully redeemed!
                        </Box>
                    }
                    sx={{ backgroundColor: '#43A047' }}
                />
            </Snackbar>

            <Typography variant="h2" sx={{ my: 2, color: "black" }} style={{ textAlign: "center" }}>
                <strong>Your Rewards</strong>
            </Typography>

            {hasRentalData && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                    <Button
                        color="primary"
                        sx={{
                            padding: '4px',
                            color: 'white',
                            fontSize: '14px',
                            transition: 'color 0.3s ease, font-size 0.3s ease',
                            '&:hover': {
                                color: "#4cceac",
                                fontSize: '16px'
                            },
                            color: "black"
                        }}
                        onClick={() => {
                            navigate('/customer/checkout');
                        }}
                    >
                        Proceed without reward
                    </Button>
                </Box>
            )}

            {
                user && redeemedrewardList.length > 0 && (
                    <>
                        <Grid container spacing={2}>
                            {groupedRedeemedRewardsArray.map((group, i) => (
                                <Grid item xs={12} md={6} lg={4} key={i}>
                                    <Card
                                        onMouseEnter={() => setHoveredCardRedeemed(group.rewards[0].name)}
                                        onMouseLeave={() => setHoveredCardRedeemed(null)}
                                        sx={{
                                            borderRadius: '12px',
                                            boxShadow: hoveredCardRedeemed === group.rewards[0].name ? '0px 12px 20px rgba(0, 0, 0, 0.3)' : 'none',
                                            // ... other card styles ...
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', mb: 1 }}>
                                                <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
                                                    {group.rewards[0].name}
                                                </Typography>
                                                {hasRentalData && (
                                                    <Button
                                                        color="primary"
                                                        sx={{
                                                            padding: '4px',
                                                            color: 'white',
                                                            fontSize: '12px',
                                                            transition: 'color 0.3s ease, font-size 0.3s ease',
                                                            '&:hover': {
                                                                color: "#4cceac",
                                                                fontSize: '15px'
                                                            },
                                                        }}
                                                        onClick={() => {
                                                            localStorage.setItem('rewardData', JSON.stringify(group.rewards[0]));
                                                            navigate('/customer/checkout');
                                                        }}
                                                    >
                                                        Apply at Checkout
                                                    </Button>
                                                )}
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: "black" }} color="text.secondary">
                                                <Typography>
                                                    Points: {group.rewards[0].pointsRequired}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} color="text.secondary">
                                                <Typography>
                                                    Expires On: {group.rewards[0].expiryDate}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', height: '20px' }} color="text.secondary">
                                                <Typography>
                                                    {group.rewards[0].description || ""}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', height: '20px', justifyContent: 'flex-end' }}>
                                                <Typography
                                                    variant="body2"
                                                    color="secondary"
                                                    sx={{ fontSize: 16, fontWeight: 'bold' }}>
                                                    {group.rewards.length > 1 ? `x${group.rewards.length}` : ''}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}

            <Typography variant="h4" sx={{ my: 2 }} style={{ textAlign: "center" }}>
                Get Rewards
            </Typography>
            {user && (
                <Typography variant="h5" sx={{ my: 2, color: "black" }}>
                    <strong>Your Points:</strong> {user && user.points !== null ? user.points : 0}
                </Typography>
            )}

            <Box sx={{ display: 'flex', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton type="button" sx={{ p: 1 }} onClick={onClickSearch}>
                    <SearchIcon />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
            </Box>

            <Grid container spacing={2}>
                {groupedRewardsArray.map((group, i) => (
                    <Grid item xs={12} md={6} lg={4} key={i}>
                        <Card
                            onMouseEnter={() => setHoveredCard(group.rewards[0].name)}
                            onMouseLeave={() => setHoveredCard(null)}
                            sx={{
                                borderRadius: '12px',
                                boxShadow: hoveredCard === group.rewards[0].name ? '0px 12px 20px rgba(0, 0, 0, 0.3)' : 'none',
                                // ... other card styles ...
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', mb: 1 }}>
                                    <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
                                        {group.rewards[0].rewardName}
                                    </Typography>
                                    <Button
                                        color="primary"
                                        sx={{
                                            padding: '4px',
                                            color: 'white',
                                            fontSize: '12px',
                                            transition: 'color 0.3s ease, font-size 0.3s ease',
                                            '&:hover': {
                                                color: "#4cceac",
                                                fontSize: '15px'
                                            },
                                        }}
                                        onClick={() => handleOpen(group.rewards[0])}
                                        disabled={user.points < group.rewards[0].points_required}
                                    >
                                        Redeem
                                    </Button>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} color="text.secondary">
                                    <Typography>
                                        Points: {group.rewards[0].pointsRequired}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} color="text.secondary">
                                    <Typography>
                                        Expires On: {new Date(group.rewards[0].expiryDate).toISOString().split('T')[0]}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', height: '20px' }} color="text.secondary">
                                    <Typography>
                                        {group.rewards[0].description || ""}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', height: '30px', marginTop: '10px' }}>
                                    <CustomProgressBar done={user.points} total={group.rewards[0].pointsRequired} />
                                </Box>
                            </CardContent>
                        </Card>

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>
                                Redeem Reward
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Redeem this reward for {selectedReward && selectedReward.points_required} points?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="error" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="contained" color="inherit" onClick={() => redeemReward(selectedReward)}>
                                    Redeem
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </Grid>
                ))}
            </Grid>
        </Box>
          </ThemeProvider>
          </ColorModeContext.Provider>
        </>
    );
}

export default ViewRewards;