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
import ActivityContext from "../../contexts/ActivityContext";
import http from "../../http";
import AccountSidebar from "../Accounts/global/AccountSidebar";
import { useNavigate } from "react-router-dom";

function ManageActivitys() {{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [idToDelete, setIdToDelete] = useState(null);
  const [ActivityList, setActivityList] = useState([]);
  const [search, setSearch] = useState("");
  
  const { activity } = useContext(ActivityContext);
  const navigate = useNavigate();


  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getActivitys = () => {
    http.get("/Activity").then((res) => {
      console.log(res.data)
      setActivityList(res.data);
    }).catch((error) => {
        console.log("Error fetching activity details:", error);
      })
  };

  const onClick = (id) => {
    http.get(`/Activity/${id}`)
        .then((res) => {
          setOpenPopup(true);
        })
        .catch((error) => {
          console.error("Error fetching activity details:", error); 
        });
  };


  const searchActivitys = () => {
    http.get(`/Activitys?search=${search}`).then((res) => {
        setActivityList(res.data);
    });
  };

  useEffect(() => {
    getActivitys();
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
        searchActivitys();
    }
  };

  const onClickSearch = () => {
    searchActivitys();
  };

  const onClickClear = () => {
    setSearch("");
    getActivitys();
  };

  const [openPopup, setOpenPopup] = useState(false);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);

    const handleOpenPopup = (id) => {
      http.get(`/Activity/${id}`)
        .then((res) => {
          setOpenPopup(true);
        })
        .catch((error) => {
          console.error("Error fetching activity details:", error);
        });
    };

    

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const [open, setOpen] = useState(false);

  //   const handleOpen = () => {
  //     setOpen(true);
  // }; ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

  // const handleClose = () => {
  //     setOpen(false);
  // };

  const handleOpen = (id) => {
    setIdToDelete(id); // Set the id to delete when opening the dialog
    setOpen(true);
  };

  const handleClose = () => {
    setIdToDelete(null); // Reset the id when closing the dialog
    setOpen(false);
  };

//   const deleteActivity = () => {
//     http.delete(`/Activity/${id}`)
//         .then((res) => {
//             console.log(res.data);
//             handleClose(); 
//         })
//         .catch((error) => {
//             console.error("Error deleting activity:", error); ++++++++++++++++++++++++++++++++++++++++++++
//             handleClose(); 
//         });
// };
  const deleteActivity = () => {
    if (idToDelete) {
      http.delete(`/Activity/${idToDelete}`)
        .then((res) => {
          console.log(res.data);
          handleClose();
          getActivitys(); // Refresh the activity list or perform any other necessary actions after deletion
        })
        .catch((error) => {
          console.error("Error deleting activity:", error);
          handleClose();
        });
    }
  };


    const columns = [
      { field: 'id', headerName: 'Activity ID', width: 90, cellClassName: 'name-column--cell' },      
      { field: 'activity_Name', headerName: 'Activity Name', width: 120 }, 
      { field: 'tagId', headerName: 'Tag ID', width: 90 }, 
      { field: 'activityDesc', headerName: 'Activity Description', width: 150 }, // Using activity_Desc from the model
      // { field: 'imageFile', headerName: 'Image File', width: 150 }, // Using ImageFile from the model
      // Add more columns if needed
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
            onClick={() => navigate(`/editactivity/${params.row.id}`)}
          >
            <ManageAccountsIcon sx={{ ml: 1 }} />
          </Button>
        ),
      },
      {
        field: 'cancel',
        headerName: 'Cancel',
        width: 110,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="error"
            // onClick={handleOpen}
            onClick={() => handleOpen(params.row.id)}
          >
            <CancelIcon sx={{ ml: 1 }} /> 
            Delete
          </Button>
        ),
      },
    ];
    
const rows = ActivityList.map((activity, i) => ({
  id: activity.id,
  activityName: activity.activity_Name,
  tagId: activity.tag_Id,
  activityDesc: activity.activity_Desc,
  // imageFile: activity.ImageFile,
  }));

  const [pageSize, setPageSize] = useState(5)

  return (
      <div className="app">
        <AccountSidebar />
        
          <main className="adminContent">
              <Box m="20px">

              <Header title={<span style={{ color: "#fff" }}>MANAGE ACTIVITIES</span>} subtitle={<span style={{ color: "#4cceac" }}>Managing your activities</span>} />


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
                  <Button variant="contained"
                                sx={{
                                    width: '200px',
                                    backgroundColor: '#fe9e0d',
                                    padding: "0.6rem 0rem",
                                    outline: "none",
                                    border: "none",
                                    color: '#FFFFFF',
                                    cursor: "pointer",
                                    fontWeight: 600,
                                    transition: "0.2s",
                                }} onClick={() => navigate("/addactivity")}>
                                Add Activity
                            </Button>

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
    <DialogTitle>Activity Details</DialogTitle>
    <DialogContent>
        {activity && (
            <Box>
                <Typography>
                    <strong>Activity ID:</strong> {activity.id}
                </Typography>

                <Typography>
                    <strong>Activity Name:</strong> {activity.activity_Name}
                </Typography>

                <Typography>
                    <strong>Tag ID:</strong> {activity.tag_Id}
                </Typography>

                <Typography>
                    <strong>Activity Description:</strong> {activity.activity_Desc}
                </Typography>

                {/* <Typography>
                    <strong>Image File:</strong> {activity.ImageFile}
                </Typography> */}
            </Box>
        )}
    </DialogContent>
    <DialogActions sx={{ padding: '20px' }}>
        <Button variant="contained" onClick={handleClosePopup}>Close</Button>
    </DialogActions>
</Dialog>

<Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Activity
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this activity?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={deleteActivity}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>


              </Box>

          </main>
      </div>
  )
}}

export default ManageActivitys