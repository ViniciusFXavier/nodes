import React from 'react';

const Pin: React.FC = () => {
  return (
    <div
      style={{
        display: 'inline-block',
        border: '1px solid white',
        borderRadius: '10px',
        width: '15px',
        height: '15px',
        verticalAlign: 'middle',
        background: 'rgba(255, 255, 255, 0)',
        zIndex: 2,
        boxSizing: 'border-box',
      }}
    />
  );
}

export default Pin;
