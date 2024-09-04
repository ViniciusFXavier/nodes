import React from 'react';

const Arrow: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 25 24" width="20" height="20">
      <path 
        d="M0,0 L10,0 L20,10 L10,20 L0,20 Z"
        style={{
          stroke: 'white',
          fill: 'rgba(255, 255, 255, 0.0)',
          strokeWidth: '1px',
          strokeLinejoin: 'round',
        }}
      />
    </svg>
  );
}

export default Arrow;