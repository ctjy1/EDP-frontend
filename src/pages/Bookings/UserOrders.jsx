import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, Button, Grid } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import http from '../../http';
import UserContext from '../../contexts/UserContext';
import dayjs from 'dayjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function UserOrders() {
  const [orderList, setOrderList] = useState([]);
  const { user } = useContext(UserContext);

  const getOrders = () => {
    http.get('/order').then((res) => {
      setOrderList(res.data);
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Filter orders by the current user
  const currentUserOrders = orderList.filter(order => user && user.id === order.userId);

  // Extracting months and total spending from currentUserOrders for chart data
  // Extracting months and total spending from currentUserOrders for chart data
  const months = [...new Set(currentUserOrders.map((order) => dayjs(order.orderDate).format('MMMM')))];
  const totalSpendingByMonth = months.map((month) => {
    const totalSpending = currentUserOrders
      .filter((order) => dayjs(order.orderDate).format('MMMM') === month)
      .reduce((total, order) => total + order.totalAmount, 0); // Calculate total spending directly from order.totalAmount
    return totalSpending;
  });

  const chartData = {
    labels: months,
    datasets: [{
      label: 'Total Spending',
      data: totalSpendingByMonth,
      fill: false,
      borderColor: 'rgba(75,192,192,1)', // Color for line
      tension: 0.4, // Smoothing of the line
    }],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Use 'category' scale for the x-axis
        labels: months,
      },
      y: {
        beginAtZero: true, // Start y-axis from zero
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Total Spending by Month',
      },
    },
  };

  return (
    <Box sx={{ mt: 5 }}>

      <Typography variant="h2" sx={{ my: 3, color: '#fe9e0d', textAlign: 'center' }}>
        <strong>MY ORDERS</strong>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <IconButton color="primary">
          <Search />
        </IconButton>
      </Box>



      {orderList.map((order, i) => (
        user && user.id === order.userId && (
          <Accordion key={i} sx={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`order-details-${order.id}-content`}
              id={`order-details-${order.id}-header`}
            >
              <Typography variant="h6">
                {dayjs(order.orderDate).format('DD MMM YYYY HH:mm')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '0 0 5px 5px' }}>
              <Grid container justifyContent="flex-end">
                <Grid item xs={12}>
                  {order.orderDetails && (
                    order.orderDetails.map((orderDetail, j) => (
                      <Box key={j} marginBottom={2}>
                        <Typography variant="h5" sx={{ color: 'black' }}>
                          Service: {orderDetail.service} x {orderDetail.quantity}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#808080' }}>
                          Participants: {orderDetail.participants}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#808080' }}>
                          Date of event: {dayjs(orderDetail.date).format('DD MMM YYYY')}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#808080' }}>
                          Timing of event: {orderDetail.time}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#808080' }}>
                          Price: ${orderDetail.price}
                        </Typography>
                        <hr />
                      </Box>
                    ))
                  )}
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'right' }}> {/* Adjusted alignment */}
                  <Typography variant="h4" sx={{ color: '#FF0000', mb: 2 }}>
                    Order Total: ${order.totalAmount}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "black",
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                      color: "white",
                      transition: "0.2s",
                      mr: 2
                    }}
                  >
                    Buy Again
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      outline: "none",
                      border: "1px solid black",
                      cursor: "pointer",
                      fontWeight: 600,
                      color: "black",
                      transition: "0.2s",
                      '&:hover': {
                        backgroundColor: "black",
                        color: "white",
                      }
                    }}
                  >
                    Request For Refund
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        )
      ))}

      <Box sx={{ mt: 10 }}></Box>

      <Line data={chartData} options={chartOptions} />

      <Box sx={{ mt: 20 }}></Box>



    </Box>
  );
}

export default UserOrders;
