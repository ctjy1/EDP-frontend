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
import BookingSidebar from "./global/BookingSidebar";
import Header from "../../components/Header";


function Orders() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderList, setOrderList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const getOrders = () => {
        http.get('/order').then((res) => {
            setOrderList(res.data);
            calculateServicePopularity(res.data);
        });
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
        <div className="app">
            <BookingSidebar />

            <main className="adminContent">
                <Box m="20px">

                    <Header title={<span style={{ color: "#fff" }}>MANAGING ORDERS</span>} subtitle={<span style={{ color: "#4cceac" }}>Managing All ORDERS</span>} />


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
            </main>
        </div>
    );
}


export default Orders;