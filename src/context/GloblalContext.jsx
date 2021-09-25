import React from 'react';
import context from '.';

const GloblalContext = ({ children }) => {
  const [list, setList] = React.useState([]);
  const [doneTasks, setDoneTasks] = React.useState([]);
  const [selectedTask, setSelectedTask] = React.useState(null);

  
  React.useEffect(() => {
    if(localStorage.getItem('doneTasks') && localStorage.getItem('list')) {
      setDoneTasks(JSON.parse(localStorage.getItem('doneTasks')));
      setList(JSON.parse(localStorage.getItem('list')));
    }
  }, []);
    
  React.useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  
  React.useEffect(() => {
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
  }, [doneTasks]);

  const addItem = (item) => {
    if (item.task.trim() !== '') {
      setList([...list, item]);
    }
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

  const deleteDoneTask = (id) => {
    setDoneTasks(doneTasks.filter(taskId => taskId !== id));
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
    deleteDoneTask,
  };

  return (
    <context.Provider value={state}>
      {children}
    </context.Provider>
  );
}

export default GloblalContext;
