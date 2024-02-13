import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import http from '../../http';
import { useTheme } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import BookingSidebar from "./global/BookingSidebar";
import Header from "../../components/Header";

function BookingChart() {
    const theme = useTheme();

    const [orderList, setOrderList] = useState([]);

    const [servicePopularity, setServicePopularity] = useState({});

    const getOrders = () => {
        http.get('/order').then((res) => {
            setOrderList(res.data);
            calculateServicePopularity(res.data);
        });
    };

    const calculateServicePopularity = (orders) => {
        const servicePopularityMap = {};
        orders.forEach(order => {
            order.orderDetails.forEach(orderDetail => {
                const service = orderDetail.service;
                if (servicePopularityMap[service]) {
                    servicePopularityMap[service]++;
                } else {
                    servicePopularityMap[service] = 1;
                }
            });
        });
        setServicePopularity(servicePopularityMap);
    };

    useEffect(() => {
        getOrders();
    }, []);


    return (
        <div className="app">
            <BookingSidebar />

            <main className="adminContent">
                <Box m="20px">

                    <Header title={<span style={{ color: "#fff" }}>SERVICE POPULARITY</span>} subtitle={<span style={{ color: "#4cceac" }}>Pie Chart Based On Service Booked</span>} />

                    {Object.keys(servicePopularity).length > 0 && (
                        <Box mt={4}>
                            <Typography variant="h3" sx={{ mt: 10, mb: 3, color: '#fe9e0d', textAlign: 'center' }}>
                                Service Popularity
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: '500px', height: '500px' }}>
                                    <Pie
                                        data={{
                                            labels: Object.keys(servicePopularity),
                                            datasets: [{
                                                data: Object.values(servicePopularity),
                                                backgroundColor: [
                                                    '#ff6384',
                                                    '#36a2eb',
                                                    '#ffce56',
                                                    '#8c4bff',
                                                    '#4bc0c0',
                                                    '#ff00bf',
                                                    '#a600a6',
                                                ],
                                                hoverOffset: 4,
                                            }],
                                        }}
                                    />
                                </div>
                            </Box>

                        </Box>
                    )}
                </Box>
            </main>
        </div>
    )
}

export default BookingChart