import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button, useTheme } from '@mui/material';
import { AccountCircle, AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from "../../http";
import dayjs from 'dayjs';
import global from '../../global';
import UserContext from '../../contexts/UserContext';
import { tokens } from '../../themes/AdminTheme';
import Header from '../../components/Header';
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";


function Rewards() {
  const [rewardList, setRewardList] = useState([]);
  const [search, setSearch] = useState('');
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getRewards = () => {
    http.get('/reward').then((res) => {
      setRewardList(res.data);
    });
  };

  const groupRewardsByName = (rewards) => {
    const groupedRewards = rewards.reduce((acc, reward) => {
      const { rewardName, Quantity } = reward;
      if (!acc[rewardName]) {
        acc[rewardName] = { ...reward, Quantity: 1 };
      } else {
        acc[rewardName].Quantity += 1;
      }
      return acc;
    }, {});

    return Object.values(groupedRewards);
  };

  const groupedRewardList = groupRewardsByName(rewardList);

  const searchRewards = () => {
    http.get(`/reward?search=${search}`).then((res) => {
      setRewardList(res.data);
    });
  };

  useEffect(() => {
    getRewards();
    console.log(rewardList);
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

  const columns = [
    {
      field: "rewardName",
      headerName: "Reward Name",
      flex: 1,
      cellClassName: "name-column--cell"
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      flex: 1
    },
    {
      field: "pointsRequired",
      headerName: "Points Required",
      headerAlign: "left",
      flex: 1
    },
    {
      field: "expiryDate",
      headerName: "Expiry Date",
      flex: 1,
      valueGetter: (params) => dayjs(params.row.expiryDate).format('YYYY-MM-DD')
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    }
  ];

  return (
    <div className="app">
      <main className="content">
        <Box m="20px">
          <Header title="REWARDS" subtitle="Retrieving Rewards" />
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Input
              value={search}
              placeholder="Search"
              onChange={onSearchChange}
              onKeyDown={onSearchKeyDown}
            />

            <IconButton type="button" sx={{ p: 1 }} onClick={onClickSearch}>
              <SearchIcon />
            </IconButton>
            <IconButton type="button" onClick={onClickClear}>
              <Clear />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />

            <Button variant="contained"
              component={Link} to="/admin/deletedrewards"
              sx={{
                bgcolor: 'transparent', // Set background color to transparent
                color: 'black', // Set font color to white
                '&:hover': {
                  bgcolor: 'transparent', // Set background color to transparent on hover
                },
              }}>
              Deleted Rewards
            </Button>

          </Box>

          <Box
            m="40px 0 0 0"
            height="75vh"  // Set the height to 75vh to match the original table size
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
              rows={groupedRewardList}
              columns={columns}
              getRowId={(row) => row.id}
              getRowClassName={(params) => 'clickable-row'}
              onRowClick={(params) => {
                const id = params.row.id;
                window.location.href = `/morerewards/${id}`;
              }} />

          </Box>
        </Box>
      </main>
    </div>
  );
}

export default Rewards;