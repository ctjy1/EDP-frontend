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
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

function ManageMoreRewards() {
  {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rewardList, setRewardList] = useState([]);
    const [search, setSearch] = useState("");
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [reward, setReward] = useState(null);

    const onSearchChange = (e) => {
      setSearch(e.target.value);
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

    const searchRewards = () => {
      http.get(`/reward?search=${search}`).then((res) => {
        setRewardList(res.data);
      });
    };

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

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const deleteReward = () => {
    http.delete(`/reward/${id}`)
        .then((res) => {
            console.log(res.data);
            // Optionally, you can update the local state to remove the deleted reward from the list
            setRewardList(rewardList.filter(reward => reward.id !== id));
            handleClose(); // Close the dialog after deleting the reward
        })
        .catch((error) => {
            console.error("Error deleting reward:", error);
            handleClose(); // Close the dialog if an error occurs
        });
};

    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'pointsRequired', headerName: 'Points Required', width: 130 },
      { field: 'expiryDate', headerName: 'Expiry Date', width: 130 },
      { field: 'description', headerName: 'Description', width: 200 },
      { field: 'redeemedAt', headerName: 'Redeemed At', width: 130 },
      { field: 'redeemedBy', headerName: 'Redeemed By', width: 130 },
      {
        field: 'edit',
        headerName: '',
        width: 110,
        renderCell: (params) => (
          <Link to={`/editreward/${params.row.id}`}>
            <Button
              variant="contained"
              sx={{
                background: '#009578',
                '&:hover': {
                  background: '#008168',
                },
              }}
            >
              Edit
            </Button>
          </Link>
        ),
      },
      {
        field: 'cancel',
        headerName: '',
        width: 90,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="error"
            onClick={handleOpen}
          >
            Delete
          </Button>
        ),
      },
    ];

    const rows = rewardList.map((reward, i) => ({
      id: reward.id,
      pointsRequired: reward.pointsRequired,
      expiryDate: dayjs(reward.expiryDate).format("YYYY-MM-DD"),
      description: reward.description,
      redeemedAt: reward.redeemedAt ? dayjs(reward.redeemedAt).format("YYYY-MM-DD") : "N/A",
      redeemedBy: reward.redeemedBy ? reward.redeemedBy : "N/A",
    }));

    const [pageSize, setPageSize] = useState(5)

    return (
      <div className="appAdmin" width="100%">
        <RewardSidebar />

        <main className="adminContent">
          <Box m="20px">

            <Header title={
              <span style={{ color: "#fff" }}>MANAGING REWARD:
                {reward && <span style={{ marginLeft: "5px", color: "#fff" }}>{reward.rewardName}</span>}
              </span>
            }
              subtitle={<span style={{ color: "#4cceac" }}>Managing rewards</span>} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Reward
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this reward?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={deleteReward}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>


          </Box>

        </main>
      </div>
    )
  }
}

export default ManageMoreRewards;