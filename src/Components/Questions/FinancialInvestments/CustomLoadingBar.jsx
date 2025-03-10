import React from 'react'

const CustomLoadingBar = ({ progress }) => {
    return (
      <div
        style={{
          position: "relative",
          height: "3px",
          width: "100%",
          background: "#ddd",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#36b446",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>
    );
  };

export default CustomLoadingBar