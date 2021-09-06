import React from 'react';
import context from '.';

const GloblalContext = ({ children }) => {
  const [list, setList] = React.useState([]);
  const [doneTasks, setDoneTasks] = React.useState([]);
  const [selectedTask, setSelectedTask] = React.useState(null);

  const addItem = (item) => {
    setList([...list, item]);
  };

  const deleteItem = () => {
    setList(list.filter(({id}) => id !== selectedTask));
    setSelectedTask(null);
  };

  const changeDoneTask = () => {
    const newDoneTasks = doneTasks.includes(selectedTask)
      ? doneTasks.filter(taskId => taskId !== selectedTask)
      : [...doneTasks, selectedTask];

    setDoneTasks(newDoneTasks);
  }

  const state = {
    addItem,
    list,
    selectedTask,
    setSelectedTask,
    deleteItem,
    doneTasks,
    changeDoneTask,
  };

  return (
    <context.Provider value={state}>
      {children}
    </context.Provider>
  )
}

export default GloblalContext;
