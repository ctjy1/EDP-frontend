import React, { useEffect, useState, useContext } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../themes/AdminTheme";
import { Box, Typography, Input, IconButton, Button } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Header from "../../components/Header";
import UserContext from "../../contexts/UserContext";
import http from "../../http";
import RewardSidebar from "./global/RewardSidebar";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function ManageDeletedRewards() {
  {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rewardList, setRewardList] = useState([]);
    const [search, setSearch] = useState("");
    const { user } = useContext(UserContext);
    const [groupingOption, setGroupingOption] = useState("all");

    const onSearchChange = (e) => {
      setSearch(e.target.value);
    };

    const getRewards = () => {
      http.get('/reward').then((res) => {
        const deletedRewards = res.data.filter(reward => reward.deletedAt !== null);
        setRewardList(deletedRewards);
        console.log(rewardList);
      });
    };

    const groupRewardsByName = (rewards) => {
      const groupedRewards = rewards.reduce((acc, reward) => {
        const { rewardName, quantity } = reward;
        if (!acc[rewardName]) {
          acc[rewardName] = { ...reward, quantity: 1 };
        } else {
          acc[rewardName].quantity += 1;
        }
        return acc;
      }, {});

      return Object.values(groupedRewards);
    };

    const searchRewards = () => {
      http.get(`/reward?search=${search}`).then((res) => {
        setRewardList(res.data);
      });
    };

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
    };

    const onClickClear = () => {
      setSearch("");
      getRewards();
    };

    const [openPopup, setOpenPopup] = useState(false);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);

    const handleOpenPopup = (id) => {
      http.get(`/reward/${id}`)
        .then((res) => {
          setUser(res.data);
          setOpenPopup(true);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    };


    const handleClosePopup = () => {
      setOpenPopup(false);
    };

    const groupRewardsByOption = (rewards, option) => {
      if (!option || option === "all" || !rewards || rewards.length === 0) {
        return rewards;
      }

      if (option === "rewardName") {
        return groupRewardsByName(rewards);
      }

      return []; 
    };

    const handleGroupingChange = (event) => {
      setGroupingOption(event.target.value);
    };

    const isGrouped = groupingOption !== "all";


    const columns = [
      { field: 'rewardName', headerName: 'Reward Name', width: 100 },
      { field: 'pointsRequired', headerName: 'Points Required', width: 90 },
      { field: 'expiryDate', headerName: 'Expiry Date', width: 100 },
      { field: 'discount', headerName: 'Discount', width: 60 },
      { field: 'description', headerName: 'Description', width: 160 }
    ];

    if (isGrouped) {
      columns.push({ field: 'quantity', headerName: 'Quantity', width: 90 });
    }
    
    if (!isGrouped) {
      columns.push(
        { field: 'deletedAt', headerName: 'Deleted At', width: 100 }
      );
    };

    const rows = groupRewardsByOption(rewardList, groupingOption).map((reward, i) => ({
      id: reward.id,
      rewardName: reward.rewardName,
      quantity: reward.quantity || 1,
      pointsRequired: reward.pointsRequired,
      expiryDate: dayjs(reward.expiryDate).format('YYYY-MM-DD'),
      discount: reward.discount,
      description: reward.description,
      deletedAt: dayjs(reward.deletedAt).format('YYYY-MM-DD')
    }));

    const [pageSize, setPageSize] = useState(5)

    return (
      <div className="appAdmin" width="100%">
        <RewardSidebar />

        <main className="adminContent">
          <Box m="20px">

            <Header title={<span style={{ color: "#fff" }}>MANAGING DELETED REWARDS</span>} 
            subtitle={<span style={{ color: "#4cceac" }}>Deleted Rewards</span>} />


            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>

              <Box>
                <Input
                  value={search}
                  placeholder="Search"
                  onChange={onSearchChange}
                  onKeyDown={onSearchKeyDown}
                  style={{ color: "#fff" }}
                />
                <IconButton style={{ color: "#fff" }} onClick={onClickSearch}>
                  <Search />
                </IconButton>
                <IconButton style={{ color: "#fff" }} onClick={onClickClear}>
                  <Clear />
                </IconButton>
              </Box>
              <Box>
                <FormControl>
                  <InputLabel id="grouping-option-label">Group By</InputLabel>
                  <Select
                    labelId="grouping-option-label"
                    id="grouping-option"
                    value={groupingOption}
                    onChange={handleGroupingChange}
                    sx={{ minWidth: '100px' }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="rewardName">Reward Name</MenuItem>
                    {/* Add more MenuItem components for other grouping options */}
                  </Select>
                </FormControl>
              </Box>

            </Box>

            <Box
              height='75vh'
              width='100%'

              mb='200px'
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
              }}
            >

              <DataGrid
                columns={columns}
                rows={rows}
                slots={{
                  toolbar: GridToolbar,
                }}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pageSizeOptions={[5, 10, 25, 100]}
              >
              </DataGrid>
            </Box>


            <Dialog open={openPopup} onClose={handleClosePopup} fullWidth>
              <DialogTitle>User Details</DialogTitle>
              <DialogContent>
                {user && (
                  <Box>
                    <Typography>
                      <strong>User ID:</strong> {user.id}
                    </Typography>

                    <Typography>
                      <strong>Name:</strong> {user.firstName} {user.lastName}
                    </Typography>

                    <Typography>
                      <strong>Userame:</strong> @{user.username}
                    </Typography>

                    <Typography>
                      <strong>Email:</strong> {user.email}
                    </Typography>

                    <Typography>
                      <strong>Phone Number:</strong> {user.contactNumber}
                    </Typography>

                    <Typography>
                      <strong>Address 1:</strong> {user.address1}
                    </Typography>

                    <Typography>
                      <strong>Address 2:</strong> {user.address2}
                    </Typography>

                    <Typography>
                      <strong>Referral Code:</strong> {user.referralCode}
                    </Typography>
                  </Box>
                )}

              </DialogContent>
              <DialogActions sx={{ padding: '20px' }}>
                <Button variant="contained" onClick={handleClosePopup}>Close</Button>
              </DialogActions>
            </Dialog>


          </Box>

        </main>
      </div>
    )
  }
}

export default ManageDeletedRewards;