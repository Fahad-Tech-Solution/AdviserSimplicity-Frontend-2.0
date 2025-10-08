import React from 'react';
import './ProgressBar.css'; // Assuming your CSS is saved in ProgressBar.css

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
