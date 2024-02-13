import React from 'react';
import './ProgressBar.css';

const CustomProgressBar = ({ done, total, userPoints, requiredPoints }) => {
    const widthPercentage = total !== 0 ? (done / total) * 100 : 0;

    const style = {
        width: `${widthPercentage}%`,
        background: `linear-gradient(to right, #FF5722, #FFC107)`,
        '--user-points': userPoints,
        '--required-points': requiredPoints
    };

    return (
        <div className="progress-container">
            <div className="progress-bar" style={style}>
                <span className="progress-label">{done}/{total} points</span>
            </div>
        </div>
    );
};

export default CustomProgressBar;