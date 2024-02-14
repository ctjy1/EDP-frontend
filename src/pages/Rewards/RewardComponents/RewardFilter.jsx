import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';

const RewardFilter = ({ onFilterChange, section }) => {
    const [expiryDate, setExpiryDate] = useState('');
    const [discount, setDiscount] = useState('');
    const [pointsRequired, setPointsRequired] = useState('');
    const [activityTag, setActivityTag] = useState('');

    const handleApplyFilter = () => {
        onFilterChange({ expiryDate, discount, pointsRequired, section });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
             {section === 'your-rewards' && (
              <FormControl sx={{ minWidth: '120px', mr: 2 }}>
              <InputLabel sx={{ color: 'black' }}>Expiry Date</InputLabel>
              <Select 
                  value={expiryDate} 
                  onChange={(e) => setExpiryDate(e.target.value)}
                  sx={{
                      borderRadius: '8px',
                      height: '36px',
                      border: '1px solid #aaa',
                      '& .MuiSelect-select': { color: 'black' }, // Set selected text color to black
                  }}
              >
                    <MenuItem value="all">All</MenuItem>
                  <MenuItem value="thirty-days">Within 30 Days</MenuItem>
                  <MenuItem value="six-months">Within 6 Months</MenuItem>
                  <MenuItem value="one-year">Within 1 Year</MenuItem>
              </Select>
          </FormControl>
            )}
        {section === 'get-rewards' && (
            <>
             <FormControl sx={{ minWidth: '120px', mr: 2 }}>
            <InputLabel sx={{ color: 'black' }}>Discount</InputLabel>
            <Select 
                value={discount} 
                onChange={(e) => setDiscount(e.target.value)}
                sx={{
                    borderRadius: '8px',
                    height: '36px',
                    border: '1px solid #aaa',
                    '& .MuiSelect-select': { color: 'black' }, // Set selected text color to black
                }}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="two-to-ten">2%-10%</MenuItem>
                <MenuItem value="eleven-to-twenty">11%-20%</MenuItem>
                <MenuItem value="above-twenty">Above 20%</MenuItem>

            </Select>
        </FormControl>
        <FormControl sx={{ minWidth: '120px', mr: 2 }}>
            <InputLabel sx={{ color: 'black' }}>Points Required</InputLabel>
            <Select 
                value={pointsRequired} 
                onChange={(e) => setPointsRequired(e.target.value)}
                sx={{
                    borderRadius: '8px',
                    height: '36px',
                    border: '1px solid #aaa',
                    '& .MuiSelect-select': { color: 'black' }, // Set selected text color to black
                }}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="below-onefifty">Below 150</MenuItem>
                <MenuItem value="onefifty-to-threehundred">150-300</MenuItem>
                <MenuItem value="threehundred-to-fourfifty">300-450</MenuItem>
                <MenuItem value="above-fourfifty">Above 450</MenuItem>
            </Select>
        </FormControl>
            </>
        )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleApplyFilter}
            >
                Apply Filter
            </Button>
        </Box>
    );
};

export default RewardFilter;
