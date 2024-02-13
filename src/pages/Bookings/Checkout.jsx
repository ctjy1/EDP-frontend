import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../../http';
import dayjs from 'dayjs';
import UserContext from '../../contexts/UserContext';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function Checkout() {
    const [cartList, setCartList] = useState([]);
    const { user } = useContext(UserContext);

    // Add this log statement to check the userId of the authenticated user
    console.log('Authenticated User ID:', user);

    const [budgetList, setBudgetList] = useState([]);

    const getCarts = () => {
        http.get('/cart').then((res) => {
            setCartList(res.data);
        });
    };

    const getBudget = () => {
        http.get('/budget').then((res) => {
            setBudgetList(res.data);
        });
    };

    useEffect(() => {
        getCarts();
        getBudget();
    }, []);

    const handleEmptyCart = () => {
        http.delete('/cart/all').then(() => {
            setCartList([]);
            handleClose();
        });
    };

    const activityImages = {
        'High Tea Session': '/images/hightea.png',
        'Yacht Rental': '/images/yatch.jpg',
        'SG Pub Crawls': '/images/pubcrawl.jpg',
        'Skating Lessons': '/images/skating.jpg',
    }

    const totalPayable = cartList
        .filter(cart => user && user.id === cart.userId)
        .reduce((total, cartItem) => {
            return total + (cartItem.price || 0);
        }, 0);

    const handleCheckout = () => {
        http.post("/cart/create-checkout-session")
            .then((res) => {
                console.log(res.data);
                window.location.href = res.data.url;
            })
            .catch((error) => {
                console.error(error);
                // Handle error, show error message, etc.
            });
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            {/* Add log statement to check the number of cart items */}
            {console.log('Number of Cart Items:', cartList.length)}

            <Typography variant="h1" sx={{ my: 2, color: '#4c4c4c' }}>
                Checkout
            </Typography>

            {cartList.some(cart => user && user.id === cart.userId) ? (
                <Box>
                    {/* Add log statement to check if the user's cart is empty */}
                    {console.log('User Cart is Not Empty')}
                    
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr',
                            alignItems: 'center',
                            mb: 2,
                            borderBottom: '1px solid rgb(187, 187, 187)',
                            paddingBottom: '10px'
                        }}
                    >
                        <Typography variant="h4" sx={{ color: '#333' }}>Service</Typography>
                        <Typography variant="h4" sx={{ color: '#333' }}>Participants</Typography>
                        <Typography variant="h4" sx={{ color: '#333' }}>Date & Time</Typography>
                        <Typography variant="h4" sx={{ color: '#333' }}>Quantity</Typography>
                        <Typography variant="h4" sx={{ textAlign: 'right', color: '#333' }}>Subtotal</Typography>
                    </Box>

                    {cartList.map((cart, i) => (
                        user && user.id === cart.userId && (
                            <div key={cart.id}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={activityImages[cart.service]} alt="Service Image" style={{ width: '130px', height: '130px', marginRight: '10px' }} />
                                        <Typography variant='h5' sx={{ color: '#FF0000' }}>{cart.service}</Typography>
                                        <Link to={`/editcart/${cart.id}`}>
                                            <IconButton sx={{ color: '#FF0000' }}>
                                                <Edit />
                                            </IconButton>
                                        </Link>
                                    </Box>
                                    <Typography variant='h5' sx={{ color: '#333' }}>{cart.participants}</Typography>
                                    <Typography variant='h5' sx={{ color: '#333' }}>
                                        {dayjs(cart.date).format('YYYY-MM-DD')} {cart.time.substring(0, 5)}
                                    </Typography>
                                    <Typography variant='h5' sx={{ color: '#333' }}>{cart.quantity}</Typography>
                                    <Typography variant='h5' sx={{ textAlign: 'right', color: '#333' }}>Subtotal: ${cart.price}</Typography>
                                </Box>
                                {i !== cartList.length - 1 && <div style={{ borderBottom: '1px solid rgb(187, 187, 187)', marginBottom: '15px' }} />} {/* Add line only if it's not the last cart item */}
                            </div>
                        )
                    ))}

                </Box>
            ) : (
                <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20px', color: 'black' }}>
                    Your shopping cart is empty.
                    <div style={{ borderBottom: '1px solid rgb(187, 187, 187)', marginTop: '15px' }} />
                </Typography>
            )}

            {cartList.some(cart => user && user.id === cart.userId) && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Box>
                        <Button
                            onClick={handleOpen}
                            variant="contained"
                            sx={{
                                width: '200px',
                                height: '40px',
                                borderRadius: '5px',
                                letterSpacing: '1.15px',
                                border: '0.5px solid rgb(177, 177, 177)',
                                color: 'white',
                                background: 'rgba(0, 0, 0, 0.5)',
                                '&:hover': {
                                    backgroundColor: '#2c3e50',
                                    color: 'white',
                                },
                            }}
                        >
                            Empty Cart <CancelIcon sx={{ ml: 1 }} />
                        </Button>
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="h3" sx={{ color: '#333' }}>
                                Total Payable:
                            </Typography>
                            <Typography variant="h3" sx={{ color: '#333', fontWeight: 'bold' }}>
                                ${totalPayable}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="h3" sx={{ mb: 1, color: '#333' }}>
                                Discount:
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', textAlign: 'right' }}>
                                <Typography variant="h3" sx={{ color: '#333' }}>
                                    %
                                </Typography>
                            </Box>
                        </Box>
                        <Typography color="text.secondary" sx={{ mb: 1, color: '#333' }}>
                            *I have read the terms and conditions.
                        </Typography>
                        <form action="/create-checkout-session" method="POST">
                            <Button
                                onClick={() => handleCheckout()}
                                variant="contained"
                                sx={{
                                    width: '300px',
                                    height: '40px',
                                    borderRadius: '5px',
                                    letterSpacing: '1.15px',
                                    background: 'linear-gradient(to right, #ff9800, #f44336)', // Gradient background
                                    color: '#fff', // Text color
                                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Box shadow
                                    transition: 'background 0.3s, transform 0.2s', // Transition effects
                                    '&:hover': {
                                        background: 'linear-gradient(to right, #f44336, #ff9800)', // Gradient background on hover
                                        transform: 'scale(1.05)', // Slight scale-up on hover
                                    },
                                }}
                            >
                                Check Out
                            </Button>
                        </form>
                        <Typography sx={{ mt: 1 }}>
                            <Link style={{ color: '#3498db', cursor: 'pointer' }}>Terms and Conditions</Link>
                        </Typography>

                    </Box>
                </Box>
            )}

            {budgetList.length > 0 && cartList.some(cart => user && user.id === cart.userId) && (
                budgetList.map((budget, i) => (
                    user && user.id === budget.userId && (
                        <Box key={i}>
                            <Typography variant="h4" sx={{ color: '#333', mb: 1 }}>
                                Your Budget: ${budget.budget}
                            </Typography>
                            {budget.budget >= totalPayable ? (
                                <Box sx={{ display: "inline-flex", alignItems: "center", border: "1px solid #FFA500", padding: "10px" }}>

                                    <CheckCircleIcon sx={{ color: '#FFA500' }} />

                                    <Typography variant="h4" color="#FFA500" sx={{ marginLeft: "5px" }}>
                                        Total Amount is within your budget.
                                    </Typography>
                                </Box>


                            ) : (
                                <Box sx={{ display: "inline-flex", alignItems: "center", border: "1px solid #8B0000", padding: "10px" }}>

                                    <WarningIcon sx={{ color: '#8B0000' }} />

                                    <Typography variant="h4" color="#8B0000" sx={{ marginLeft: "5px" }}>
                                        Warning: Total amount exceeded your budget!
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )
                ))
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Empty Cart
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to empty your cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={handleEmptyCart}>
                        Empty
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
}

export default Checkout