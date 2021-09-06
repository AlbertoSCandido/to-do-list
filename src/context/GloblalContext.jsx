import React from 'react';
import context from '.';

const GloblalContext = ({ children }) => {
  const [list, setList] = React.useState([]);
  const [doneTasks, setDoneTasks] = React.useState([]);
  const [selectedTask, setSelectedTask] = React.useState(null);

  const addItem = (item) => {
    setList([...list, item]);
  };

  const deleteAllTasks = () => {
    setList([]);
    setDoneTasks([]);
  }

  const deleteDoneTasks = () => {
    setList(list.filter(({id}) => !doneTasks.includes(id)));
    setDoneTasks([]);
  }

  const changeDoneTask = () => {
    const newDoneTasks = doneTasks.includes(selectedTask)
      ? doneTasks.filter(taskId => taskId !== selectedTask)
      : [...doneTasks, selectedTask];

    setDoneTasks(newDoneTasks);
    setSelectedTask(null);
  }

  const state = {
    addItem,
    list,
    setList,
    selectedTask,
    setSelectedTask,
    doneTasks,
    changeDoneTask,
    deleteDoneTasks,
    deleteAllTasks,
  };

  return (
    <context.Provider value={state}>
      {children}
    </context.Provider>
  );
}

export default GloblalContext;
