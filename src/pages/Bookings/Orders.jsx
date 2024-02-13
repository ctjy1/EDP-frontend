import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import http from '../../http';
import { useTheme } from '@mui/material';
import { tokens } from '../../themes/MyTheme'
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


function Orders() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderList, setOrderList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

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

    const handleButtonClick = (orderId) => {
        const selectedOrder = orderList.find((order) => order.id === orderId);
        setSelectedOrder(selectedOrder);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const columns = [
        { field: 'id', headerName: 'Order ID', flex: 1 },
        { field: 'orderDate', headerName: 'Order Date', flex: 1 },
        { field: 'totalAmount', headerName: 'Total Amount', flex: 1 },
        { field: 'userName', headerName: 'User Name', flex: 1 },
        {
            field: 'detailsButton',
            headerName: 'Details',
            flex: 1,
            renderCell: (params) => (
                <Button variant="contained" onClick={() => handleButtonClick(params.row.id)}
                    sx={{
                        background: '#009578',
                        '&:hover': {
                            background: '#008168',
                        },


                    }}>
                    Details
                    <ManageAccountsIcon sx={{ ml: 1 }} />
                </Button>
            ),
        },
    ];

    const rows = orderList.map((order, i) => ({
        id: order.id,
        orderDate: dayjs(order.orderDate).format('YYYY-MM-DD HH:mm'), // Format the order date
        totalAmount: order.totalAmount,
        userName: order.user.username,
        detailsButton: 'details',
    }));

    const [pageSize, setPageSize] = useState(5)

    return (
        <Box>
            <Typography variant="h2" sx={{ my: 3, color: '#fe9e0d' }}>
                <strong>MANAGE ORDERS</strong>
            </Typography>

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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: colors.blueAccent[700] + " !important", // Set the text color for the toolbar buttons
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

                {Object.keys(servicePopularity).length > 0 && (
                    <Box mt={4}>
                        <Typography variant="h3" sx={{ mt: 10, mb: 3,color: '#fe9e0d', textAlign: 'center' }}>
                            Service Popularity
                        </Typography>
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
                    </Box>
                )}

                <Dialog open={openDialog} onClose={handleCloseDialog}
                    PaperProps={{ sx: { width: '400px', maxWidth: '90vw', maxHeight: '90vh', height: 'auto' } }}>
                    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px' }}>
                        {`Order Details (Order ID: ${selectedOrder?.id})`}
                        <CancelIcon onClick={handleCloseDialog} />
                    </DialogTitle>
                    <DialogContent>

                        {selectedOrder?.orderDetails.map((orderDetail) => (
                            <Box key={orderDetail.id}>
                                {/* Display order detail information */}
                                <Typography>{`Service: ${orderDetail.service}`}</Typography>
                                <Typography>{`Participants: ${orderDetail.participants}`}</Typography>
                                <Typography>{`Quantity: ${orderDetail.quantity}`}</Typography>
                                <hr />
                            </Box>
                        ))}
                    </DialogContent>
                </Dialog>

            </Box>
        </Box>
    );
}


export default Orders;