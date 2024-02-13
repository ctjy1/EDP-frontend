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
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Header from "../../components/Header";
import UserContext from "../../contexts/UserContext";
import http from "../../http";
import AccountSidebar from "./global/AccountSidebar";


function ReferralTracking() {{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [search, setSearch] = useState("");
  const [referralTrackingList, setReferralTrackingList] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null); // New state for popup user details
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedUserForDeletion, setSelectedUserForDeletion] = useState(null);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getReferrals = () => {
    http.get("/ReferralTracking").then((res) => {
        setReferralTrackingList(res.data);
    }).catch((error) => {
        console.log("Error fetching referral details:", error);
      })
  };

  const searchReferrals = () => {
    http.get(`/ReferralTracking?search=${search}`).then((res) => {
        setReferralTrackingList(res.data);
    });
  };

  useEffect(() => {
    getReferrals();
  }, []);

  

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
        searchReferrals();
    }
  };

  const onClickSearch = () => {
    searchReferrals();
  };

  const onClickClear = () => {
    searchReferrals("");
    getReferrals();
  };
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

    const handleOpenPopup = (user) => {
      setSelectedUser(user); // Set the selected user details
      setOpenPopup(true);
    };
    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const handleOpenCancelDialog = (user) => {
        setSelectedUserForDeletion(user); // Store the user that might be deleted
        setOpenCancelDialog(true);
      };
    
      const handleDeleteReferral = () => {
        if (selectedUserForDeletion) {
          http.delete(`/ReferralTracking/${selectedUserForDeletion.id}`)
            .then(() => {
              // After successful deletion, close the dialog and refresh the list
              setOpenCancelDialog(false);
              getReferrals(); // Fetch the updated list of referrals
            })
            .catch((error) => {
              console.error("Error deleting referral:", error);
              // Handle error (e.g., show an error message)
            });
        }
      };

  const columns = [
      { field: 'id', headerName: 'Referral ID', width: 100, cellClassName: 'name-column--cell' },
      { field: 'referredUsername', headerName: 'Referred Username', width: 120 },
      { field: 'referringUsername', headerName: 'Referred By Username', width: 150 },
      { field: 'dateFulfilled', headerName: 'Date Fufilled', width: 120 },
      {
          field: 'status',
          headerName: 'Status',
          width: 140,
          renderCell: (params) => {
              let statusStyle = {
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                  borderRadius: '4px',
              };
              let statusIcon = null;

              switch (params.value) {
                  case 'Approved':
                      statusStyle.color = '#2ecc71';
                      statusStyle.border = '2px solid #2e7d32';
                      statusIcon = <DoneIcon sx={{ mr: 1 }} />;
                      break;
                  case 'Pending':
                      statusStyle.color = '#ff9f43';
                      statusStyle.border = '2px solid #ed6c02';
                      statusIcon = <AutorenewIcon sx={{ mr: 1 }} />;
                      break;
                  case 'Not approved':
                      statusStyle.color = '#3498db';
                      statusStyle.border = '2px solid #0288d1';
                      statusIcon = <InfoIcon sx={{ mr: 1 }} />;
                      break;
                  case 'Late':
                      statusStyle.color = '#e74c3c';
                      statusStyle.border = '2px solid #d32f2f';
                      statusIcon = <WarningIcon sx={{ mr: 1 }} />;
                      break;
                  case 'Past':
                      statusStyle.color = '#95a5a6';
                      statusStyle.border = '2px solid #ccc';
                      statusIcon = <AssignmentTurnedInIcon sx={{ mr: 1 }} />;
                      break;
                  case 'Cancelled': // Add this case
                      statusStyle.color = '#f44336';
                      statusStyle.border = '2px solid #d32f2f';
                      statusIcon = <CancelIcon sx={{ mr: 1 }} />;
                      break;
                  default:
                      break;
              }

              return (
                  <Box sx={statusStyle}>
                      {statusIcon}
                      <Typography>{params.value}</Typography>
                  </Box>
              );
          },
      },
      {
          field: 'manage',
          headerName: 'Manage',
          width: 100,
          sortable: false,
          filterable: false,
          renderCell: (params) => (
              <Button
                  variant="contained"
                  sx={{
                      background: '#009578',
                      '&:hover': {
                          background: '#008168',
                      },


                  }}
                  onClick={() => handleOpenPopup(params.row)}
              >

                  <ManageAccountsIcon sx={{ ml: 1 }} />
              </Button>
          ),
      },
      {
          field: 'cancel',
          headerName: 'Cancel',
          width: 100,
          sortable: false,
          filterable: false,
          renderCell: (params) => (
              <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleOpenCancelDialog(params.row)}
              >

                  <CancelIcon sx={{ ml: 1 }} />
              </Button>
          ),
      },
  ];

  const rows = referralTrackingList.map((referralTracking, i) => ({
    id: referralTracking.referralId,
    referredUsername: `@${referralTracking.referredUsername}` || 'N/A',
    referringUsername: `@${referralTracking.referringUsername}` || 'N/A',
    dateFulfilled: new Date(referralTracking.dateFulfilled).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '-') || 'N/A', 
    status: referralTracking.status
}));

console.log("Rows:", rows); // Log the generated rows to the console

  const [pageSize, setPageSize] = useState(5)

  return (
    <div className="appAdmin" style={{ backgroundColor: '#141b2d' }}>

    <AccountSidebar />
    
      <main className="adminContent">
          <Box m="20px">

          <Header title={<span style={{ color: "#fff" }}>MANAGING REFERRAL TRACKING</span>} subtitle={<span style={{ color: "#4cceac" }}>Managing users' referral history</span>} />


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
                      m='40px 0 0 0'
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
    <DialogTitle><strong>User Details</strong></DialogTitle>
    <DialogContent>
        {selectedUser && (
            <Box>
                <Typography><strong>Referral ID:</strong> {selectedUser.id}</Typography>
                <Typography><strong>Reffered Username:</strong> {selectedUser.referredUsername} {selectedUser.lastName}</Typography>
                <Typography><strong>Reffered Username:</strong> @{selectedUser.referringUsername}</Typography>
                <Typography><strong>Date Fufilled:</strong> {selectedUser.dateFulfilled}</Typography>
                <Typography><strong>Status:</strong> {selectedUser.status}</Typography>
                
            </Box>
        )}
    </DialogContent>
    <DialogActions sx={{ padding: '20px' }}>
        <Button variant="contained" onClick={handleClosePopup}>Close</Button>
    </DialogActions>
</Dialog>

<Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this referral?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenCancelDialog(false)}>Cancel</Button>
        <Button onClick={handleDeleteReferral} color="error">Delete</Button> {/* Now calling the delete function */}
      </DialogActions>
    </Dialog>


              </Box>

          </main>
      </div>
  )
}}

export default ReferralTracking