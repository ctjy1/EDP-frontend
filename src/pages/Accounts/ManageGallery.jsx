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

function ManageGallery() {{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [galleryList, setGalleryList] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);
  const [selectedGallery, setSelectedGallery] = useState(null); // New state for popup user details
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedGalleryForDeletion, setSelectedGalleryForDeletion] = useState(null);


  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };


  const getGalleries = () => {
    http.get("/gallery").then((res) => {
      setGalleryList(res.data);
    }).catch((error) => {
        console.log("Error fetching gallery details:", error);
      })
  };

  const searchGalleries = () => {
    http.get(`/gallery/?search=${search}`).then((res) => {
        setUserList(res.data);
    });
  };

  const deleteGallery = () => {
    if (selectedGalleryForDeletion && selectedGalleryForDeletion.id) {
      http.delete(`/Gallery/${selectedGalleryForDeletion.id}`)
        .then(() => {
          setOpenCancelDialog(false); // Close the dialog
          getGalleries(); // Refresh the user list
        })
        .catch((error) => {
          console.error("Error deleting gallery:", error);
          // Optionally handle errors, such as displaying a notification
        });
    }
  };
  

  useEffect(() => {
    getGalleries();
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
        searchGalleries();
    }
  };

  const onClickSearch = () => {
    searchGalleries();
  };

  const onClickClear = () => {
    setSearch("");
    getGalleries();
  };

 
    const [openCancelDialog, setOpenCancelDialog] = useState(false);

    const handleOpenPopup = (gallery) => {
      setSelectedGallery(gallery); // Set the selected user details
      setOpenPopup(true);
    };
    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const handleOpenCancelDialog = (gallery) => {
      setSelectedGalleryForDeletion(gallery);
      setOpenCancelDialog(true);
    };
    

    const columns = [
      { field: 'id', headerName: 'Gallery ID', width: 90, cellClassName: 'name-column--cell' },  
      { field: 'title', headerName: 'Title', width: 150 },
      { field: 'caption', headerName: 'Caption', width: 180 },
      { field: 'location', headerName: 'Location', width: 150 },
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
    
const rows = galleryList.map((gallery, i) => ({
    id: gallery.id,
    username: gallery.username,
    title: gallery.title,
    caption: gallery.caption,
    location: gallery.location
  }));

  const [pageSize, setPageSize] = useState(5)

  return (
      <div className="app">
        <AccountSidebar />
        
          <main className="adminContent">
              <Box m="20px">

              <Header title={<span style={{ color: "#fff" }}>MANAGING POSTS</span>} subtitle={<span style={{ color: "#4cceac" }}>Managing users' posts</span>} />


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
    <DialogTitle><strong>Post Details</strong></DialogTitle>
    <DialogContent>
        {selectedGallery && (
            <Box>
                <Typography><strong>Gallery ID:</strong> {selectedGallery.id}</Typography>
                <Typography><strong>Title:</strong> {selectedGallery.title}</Typography>
                <Typography><strong>Caption:</strong> {selectedGallery.caption}</Typography>
                <Typography><strong>Location:</strong> {selectedGallery.location}</Typography>
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
      Are you sure you want to delete this post?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenCancelDialog(false)}>Cancel</Button>
    <Button onClick={deleteGallery} color="error">Delete</Button>
  </DialogActions>
</Dialog>




              </Box>

          </main>
      </div>
  )
}}

export default ManageGallery