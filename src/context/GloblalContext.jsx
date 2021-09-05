import React from 'react';
import context from './context';

const GloblalContext = ({ children }) => {
  const [list, setList] = React.useState([]);

  return (
    <context.Provider value={list}>
      {children}
    </context.Provider>
  )
}

export default GloblalContext;
