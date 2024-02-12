import React from 'react';
import './ProgressBar.css';

const CustomProgressBar = ({ done, total }) => {
    const widthPercentage = total !== 0 ? (done / total) * 100 : 0;

    const style = {
        width: `${widthPercentage}%`
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