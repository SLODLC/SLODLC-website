import React, {useEffect, useState} from 'react';

export default function Highlight ({children, color}) {
    return (<span
      style={{
        backgroundColor: color,
        fontWeight: 700,
        borderRadius: '4px',
        color: '#fff',
        padding: '0.4rem',
        boxShadow: '2px 2px 2px #888888',
      }}>
      {children}
    </span>
  );
  }