import React, {useEffect, useState} from 'react';

export default function Tabcode ({children}) {
   return (<p
      style={{
          background: 'rgb(246, 247, 248)',
          border: '0.1rem solid rgba(0, 0, 0, 0.1)',
          borderRadius: 'var(--ifm-global-radius)',
          fontFamily: 'var(--ifm-font-family-monospace)',
          padding: 'var(--ifm-pre-padding)',
          fontSize: 'var(--ifm-code-font-size)'
      }}>
      {children}
    </p>
   );
}