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
import AccountSidebar from "./global/AccountSidebar";

function ManageAdmin() {{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null); // New state for popup user details
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedUserForDeletion, setSelectedUserForDeletion] = useState(null);


  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };


  const getUsers = () => {
    http.get("/User/admins").then((res) => {
      setUserList(res.data);
    }).catch((error) => {
        console.log("Error fetching user details:", error);
      })
  };

  const searchUsers = () => {
    http.get(`/Users/?search=${search}`).then((res) => {
        setUserList(res.data);
    });
  };

  const deleteUser = () => {
    if (selectedUserForDeletion && selectedUserForDeletion.id) {
      http.delete(`/User/${selectedUserForDeletion.id}`)
        .then(() => {
          setOpenCancelDialog(false); // Close the dialog
          getUsers(); // Refresh the user list
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          // Optionally handle errors, such as displaying a notification
        });
    }
  };
  

  useEffect(() => {
    getUsers();
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
        searchUsers();
    }
  };

  const onClickSearch = () => {
    searchUsers();
  };

  const onClickClear = () => {
    setSearch("");
    getUsers();
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
      setSelectedUserForDeletion(user);
      setOpenCancelDialog(true);
    };
    

    const columns = [
      { field: 'id', headerName: 'Admin ID', width: 90, cellClassName: 'name-column--cell' },
      {
        field: 'name',
        headerName: 'Name',
        width: 120,
        renderCell: (params) => {
          const { firstName, lastName } = params.row;
          return `${firstName} ${lastName}`;
        },
      },
      
      { field: 'email', headerName: 'Email', width: 150 },
      { field: 'contactNumber', headerName: 'Mobile Number', width: 110 },
      { field: 'userRole', headerName: 'User Role', width: 150 },
      {
        field: 'manage',
        headerName: 'Manage',
        width: 110,
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
        headerName: 'Delete',
        width: 110,
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
    
const rows = userList.map((user, i) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    contactNumber: user.contactNumber,
   userRole: user.userRole
  }));

  const [pageSize, setPageSize] = useState(5)

  return (
      <div className="app">
        <AccountSidebar />
        
          <main className="adminContent">
              <Box m="20px">

              <Header title={<span style={{ color: "#fff" }}>MANAGING ADMINSTRATORS</span>} subtitle={<span style={{ color: "#4cceac" }}>Managing our adminstrator accounts</span>} />


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
    <DialogTitle><strong>Adminstrators Details</strong></DialogTitle>
    <DialogContent>
        {selectedUser && (
            <Box>
                <Typography><strong>Admin ID:</strong> {selectedUser.id}</Typography>
                <Typography><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</Typography>
                <Typography><strong>Username:</strong> @{selectedUser.username}</Typography>
                <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
                <Typography><strong>Phone Number:</strong> {selectedUser.contactNumber}</Typography>
                <Typography><strong>User Role:</strong> {selectedUser.userRole}</Typography>
              
               
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
      Are you sure you want to delete this adminstrator?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenCancelDialog(false)}>Cancel</Button>
    <Button onClick={deleteUser} color="error">Delete</Button>
  </DialogActions>
</Dialog>




              </Box>

          </main>
      </div>
  )
}}

export default ManageAdmin