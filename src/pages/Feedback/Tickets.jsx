import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Input,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../../global';
import http from '../../http';
function Ticket() {
  const [ticketList, setTicketList] = useState([]);
  const [search, setSearch] = useState('');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const [sortedField, setSortedField] = useState('id');

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getTicket = () => {
    http.get('/Cust_Ticket').then((res) => {
      setTicketList(res.data);
    });
  };

  const searchTicket = () => {
    http.get(`/Cust_Ticket?search=${search}`).then((res) => {
      setTicketList(res.data);
    });
  };
  const sortTicket = (field) => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortedField(field);
    setSortDirection(direction);

    const sortedList = [...ticketList].sort((a, b) => {
      if (direction === 'asc') {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });

    setticketList(sortedList);
  };

  useEffect(() => {
    getTicket();
  }, []);

  useEffect(() => {
    http.get('/Cust_Ticket').then((res) => {
      setTicketList(res.data);
    });
  }, []);

  return (<Box>
    <Typography variant="h5" sx={{ my: 2 }}>
      Ticket issues will be shown here
    </Typography>

    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Input
        value={search}
        placeholder="Search"
        onChange={onSearchChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            searchTicket();
          }
        }}
      />
      <IconButton color="primary" onClick={searchTicket}>
        <Search />
      </IconButton>
      <IconButton
        color="primary"
        onClick={() => {
          setSearch('');
          getTicket();
        }}
      >
        <Clear />
      </IconButton>
    </Box>

    <Grid container spacing={2}>
      {
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" onClick={() => sortTicket('id')}>
                  User ID
                </TableCell>
                <TableCell align="center" onClick={() => sortTicket('id')}>
                  Ticket ID
                </TableCell>
                <TableCell align="center" onClick={() => sortTicket('issue')}>
                  Issue
                </TableCell>
                <TableCell align="center" onClick={() => sortTicket('issue_Description')}>
                  Issue Description
                </TableCell>
                <TableCell align="center" onClick={() => sortTicket('issue_Status')}>
                  Issue Status
                </TableCell>
                <TableCell align="center" onClick={() => sortTicket('createdAt')}>
                  Created At
                </TableCell>
                <TableCell align="center" onClick={() => sortTicket('updatedAt')}>
                  Updated At
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ticketList.map((ticket, i) => (
                <TableRow key={ticket.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{ticket.userId}</TableCell>
                  <TableCell align="center">T{ticket.id}</TableCell>
                  <TableCell align="center">{ticket.issue}</TableCell>
                  <TableCell align="center">{ticket.issue_Description}</TableCell>
                  <TableCell align="center">{ticket.issue_Status}</TableCell>
                  <TableCell align="center">{dayjs(ticket.createdAt).format(global.datetimeFormat)}</TableCell>
                  <TableCell align="center">{dayjs(ticket.updatedAt).format(global.datetimeFormat)}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="primary" onClick={() => handleUpdate(ticket.id)}>
                      Update Entry
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Grid>
  </Box>);
}
export default Ticket;