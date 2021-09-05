import React from 'react';
import context from './context';

const GloblalContext = (children) => {
  const [list, setList] = React.useState([]);
  const Global = React.useContext(context);


  return (
    <Global.Provider value={list}>
      {...children}
    </Global.Provider>
  )
}

export default GloblalContext;
