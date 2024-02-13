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
import { ColorModeContext, useMode } from '../../themes/MyTheme';
import Divider from '@mui/material/Divider';
import CustomProgressBar from './RewardComponents/CustomProgressBar';
import RewardFilter from './RewardComponents/RewardFilter';
import dayjs from 'dayjs';
import * as jwtDecodeModule from "jwt-decode";

function ViewRewards() {
    const [rewardList, setRewardList] = useState([]);
    const [search, setSearch] = useState('');
    const [noRewardsFound, setNoRewardsFound] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState('');
    const [user, setUser] = useState(null);
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
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decodedUser = jwtDecodeModule.jwtDecode(token);
            setUser(decodedUser);
            http.get('/reward').then((res) => {
                const rewards = res.data;
                const redeemedRewards = [];
                const unredeemedRewards = [];

                rewards.forEach(reward => {
                    if (String(reward.redeemedBy) === String(decodedUser.nameid)) {
                        redeemedRewards.push(reward);
                    } else {
                        unredeemedRewards.push(reward);
                    }
                });

                setRedeemedRewardList(redeemedRewards);
                setRewardList(unredeemedRewards);

                console.log("Redeemed Rewards:", redeemedRewards);
                console.log("Unredeemed Rewards:", unredeemedRewards);
            });
        }
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

    const groupRewardsByName = (rewards) => {
        const groupedRewards = rewards.reduce((acc, reward) => {
            const existingGroup = acc.find(group => group.name === reward.rewardName);
            if (existingGroup) {
                existingGroup.rewards.push(reward);
            } else {
                acc.push({ name: reward.rewardName, rewards: [reward] });
            }
            return acc;
        }, []);
        return groupedRewards;
    };


    const handleFilterChange = ({ expiryDate, discount, pointsRequired, section }) => {
        let filteredRewards = [];
        let filterCriteria = '';

        if (section === 'your-rewards') {
            if (expiryDate === 'thirty-days') {
                const thirtyDaysFromNow = dayjs().add(30, 'day');
                filteredRewards = rewardList.filter(reward => dayjs(reward.expiryDate).isBefore(thirtyDaysFromNow));
            } else if (expiryDate === 'six-months') {
                const sixMonthsFromNow = dayjs().add(6, 'month');
                filteredRewards = rewardList.filter(reward => dayjs(reward.expiryDate).isBefore(sixMonthsFromNow));
            } else if (expiryDate === 'one-year') {
                const oneYearFromNow = dayjs().add(1, 'year');
                filteredRewards = rewardList.filter(reward => dayjs(reward.expiryDate).isBefore(oneYearFromNow));
            } else {
                filteredRewards = rewardList
            }

            filterCriteria = `Rewards: Expiry date within ${expiryDate.replace('-', ' ').toUpperCase()} `;
        } else if (section === 'get-rewards') {

            if (discount === 'two-to-ten') {
                filteredRewards = rewardList.filter(reward => reward.discount >= 2 && reward.discount <= 10);
                console.log("two to ten rewardList:", filteredRewards)
            } else if (discount === 'eleven-to-twenty') {
                filteredRewards = rewardList.filter(reward => reward.discount >= 11 && reward.discount <= 20);
            } else if (discount === 'above-twenty') {
                filteredRewards = rewardList.filter(reward => reward.discount > 20);
                console.log("above twenty rewardlist:", filteredRewards)
            } else {
                filteredRewards = rewardList;
            }

            if (pointsRequired === 'below-onefifty') {
                filteredRewards = rewardList.filter(reward => reward.pointsRequired < 150);
            } else if (pointsRequired === 'onefifty-to-threehundred') {
                filteredRewards = rewardList.filter(reward => reward.pointsRequired >= 150 && reward.pointsRequired <= 300);
            } else if (pointsRequired === 'threehundred-to-fourfifty') {
                filteredRewards = rewardList.filter(reward => reward.pointsRequired > 300 && reward.pointsRequired <= 450);
            } else if (pointsRequired === 'above-fourfifty') {
                filteredRewards = rewardList.filter(reward => reward.pointsRequired > 450);
            } else {
                filteredRewards = rewardList;
            }

            filterCriteria = `Rewards: ${discount.replace('-', ' ').toUpperCase()} discount, ${pointsRequired.replace('-', ' ').toUpperCase()} points required`;
        }

        if (filteredRewards.length === 0) {
            setRewardList(rewardList);
            setNoRewardsFound(true);
        } else {
            setRewardList(filteredRewards);
            setNoRewardsFound(false);
        }

        setFilterCriteria(filterCriteria);
    };

    // Group the rewards by name
    const groupedRewards = groupRewardsByName(rewardList);

    // Convert the grouped rewards object into an array of arrays
    const groupedRewardsArray = Object.values(groupedRewards);
    console.log(groupedRewardsArray);

    const groupedRedeemedRewards = groupRewardsByName(redeemedrewardList);

    const groupedRedeemedRewardsArray = Object.values(groupedRedeemedRewards);
    console.log("grouped redeemed rewards", groupedRedeemedRewardsArray);

    useEffect(() => {
        getRewards();
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

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h2" sx={{ my: 2, color: "black" }} style={{ textAlign: "center" }}>
                                <strong>Your Rewards</strong>
                            </Typography>

                            <RewardFilter onFilterChange={handleFilterChange} section="your-rewards" />
                            <Box sx={{ my: 2, color: "black" }}>
                            {filterCriteria && !noRewardsFound ? (
                                <Typography variant="h5">{filterCriteria}</Typography>
                            ) : noRewardsFound ? (
                                <Typography variant="h5">No Rewards Found</Typography>
                            ) : null}
                            </Box>

                            {
                                redeemedrewardList.length === 0 && (
                                    <Typography variant="h5" style={{ textAlign: "center", color: "black" }}>No Rewards Yet.</Typography>
                                )
                            }

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
                                                            boxShadow: hoveredCardRedeemed === group.rewards[0].rewardName ? '0px 12px 20px rgba(0, 0, 0, 0.3)' : 'none',

                                                        }}
                                                    >
                                                        <CardContent>
                                                            <Box sx={{ display: 'flex', mb: 1 }}>
                                                                <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
                                                                    {group.rewards[0].rewardName}
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
                                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} color="text.secondary">
                                                                <Typography>
                                                                    Points: {group.rewards[0].pointsRequired}
                                                                </Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} color="text.secondary">
                                                                <Typography>
                                                                    Expires On: {dayjs(group.rewards[0].expiryDate).format('YYYY-MM-DD')}
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
                        </Box>

                        <Divider sx={{ backgroundColor: 'black', my: 4 }} />

                        <Typography variant="h2" sx={{ my: 2 }} style={{ textAlign: "center", color: "black" }}>
                            <strong>Get Rewards</strong>
                        </Typography>
                        {user && (
                            <Typography variant="h4" sx={{ my: 2, color: "black" }}>
                                <strong>Your Points:</strong> {user && user.Points !== null ? user.Points : 0}
                            </Typography>
                        )}

                        <RewardFilter onFilterChange={handleFilterChange} section="get-rewards" />
                        <Box sx={{ my: 2, color: "black" }}>
                            {filterCriteria && !noRewardsFound ? (
                                <Typography variant="h5">{filterCriteria}</Typography>
                            ) : noRewardsFound ? (
                                <Typography variant="h5">No Rewards Found</Typography>
                            ) : null}
                        </Box>

                        <Grid container spacing={2}>
                            {groupedRewardsArray.map((group, i) => (
                                <Grid item xs={12} md={6} lg={4} key={i}>
                                    <Card
                                        onMouseEnter={() => setHoveredCard(group.rewards[0].rewardName)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        sx={{
                                            borderRadius: '12px',
                                            boxShadow: hoveredCard === group.rewards[0].rewardName ? '0px 12px 20px rgba(0, 0, 0, 0.3)' : 'none',
                                            opacity: user && user.Points < group.rewards[0].pointsRequired ? 0.9 : 1,
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', mb: 1 }}>
                                                <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
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
                                                    disabled={user && user.Points < group.rewards[0].pointsRequired}
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
                                                    Expires On: {dayjs(group.rewards[0].expiryDate).format('YYYY-MM-DD')}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', height: '20px' }} color="text.secondary">
                                                <Typography>
                                                    {group.rewards[0].description || ""}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', height: '30px', marginTop: '10px' }}>
                                                <CustomProgressBar
                                                    done={user.Points}
                                                    total={group.rewards[0].pointsRequired}
                                                    userPoints={user.Points}
                                                    requiredPoints={group.rewards[0].pointsRequired} />
                                            </Box>
                                        </CardContent>
                                    </Card>

                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>
                                            Redeem Reward
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Redeem this reward for {selectedReward && selectedReward.pointsRequired} points?
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