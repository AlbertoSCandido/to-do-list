import React from 'react';
import context from '.';

const GloblalContext = ({ children }) => {
  const [list, setList] = React.useState([]);

  const addItem = (item) => {
    setList([...list, item]);
  };

  const state = {
    addItem,
    list,
  };

  return (
    <context.Provider value={state}>
      {children}
    </context.Provider>
  )
}

export default GloblalContext;
