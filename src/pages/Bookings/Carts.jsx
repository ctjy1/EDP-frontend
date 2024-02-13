import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button, Divider } from '@mui/material';
import { AccountCircle, AccessTime, Search, Clear, Edit, AddShoppingCart } from '@mui/icons-material';
import http from '../../http';
import dayjs from 'dayjs';
import global from '../../global';
import UserContext from '../../contexts/UserContext';

function Carts() {
    const [cartList, setCartList] = useState([]);
    const [search, setSearch] = useState('');
    const { user } = useContext(UserContext);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getCarts = () => {
        http.get('/cart').then((res) => {
            setCartList(res.data);
        });
    };

    const searchCarts = () => {
        http.get(`/cart?search=${search}`).then((res) => {
            setCartList(res.data);
        });
    };

    useEffect(() => {
        getCarts();
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchCarts();
        }
    };

    const onClickSearch = () => {
        searchCarts();
    }

    const onClickClear = () => {
        setSearch('');
        getCarts();
    };

    return (
        <Box>
            <Typography variant="h2" sx={{ my: 3, color: '#fe9e0d' }}>
                <strong>ALL CARTS</strong>
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    sx={{
                        color: "#000000",
                        borderBottom: '1px solid #000000', // Border style
                        '&:hover': { borderBottom: '1px solid #fe9e0d' }, // Hover effect
                    }}
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
            </Box>

            <Grid container spacing={2}>
                {
                    cartList.map((cart, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={cart.id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                            <Typography variant="h6">
                                                Cart Id: {cart.id}
                                            </Typography>
                                            {
                                                user && user.id === cart.userId && (
                                                    <Link to={`/editcart/${cart.id}`}>
                                                        <IconButton color="primary">
                                                            <Edit />
                                                        </IconButton>
                                                    </Link>
                                                )
                                            }
                                        </Box>

                                        <Divider />

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 1 }}
                                            color="text.secondary">
                                            <AccountCircle sx={{ mr: 1 }} />
                                            <Typography>
                                                {cart.user.username}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(cart.createdAt).format(global.datetimeFormat)}
                                            </Typography>
                                        </Box>

                                        <Divider />

                                        <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                            Details:
                                        </Typography>

                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            Service: {cart.service}
                                        </Typography>

                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            Participants: {cart.participants}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            Quantity: {cart.quantity}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            Date: {dayjs(cart.date).format('YYYY-MM-DD')}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            Time: {cart.time.substring(0, 5)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
}

export default Carts;
