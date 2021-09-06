import React from 'react'
import TaskList from '../components/TaskList';
import context from '../context';

const Home = () => {
  const { 
    addItem,
    deleteItem,
    changeDoneTask,
    deleteDoneTasks,
    deleteAllTasks,
  } = React.useContext(context);
  const [task, setTask] = React.useState({task: '', id: ''});

  const addTask = () => {
    addItem(task)
    setTask({task: '', id: ''})
  }

  return (
    <>
      <div className="App">
        To-do List
        <div>
          <input
            type="text"
            value={task.task}
            onChange={e => setTask({ task: e.target.value, id: Date.now() })}
          />
          <button type="button" className="btn" onClick={ addTask }>Add task</button>
        </div>
        <button type="button" className="btn" onClick={ deleteItem }>Detele task</button>
        <button type="button" className="btn" onClick={ changeDoneTask}>Finish / Unfinish</button>
        <button type="button" className="btn" onClick={ deleteDoneTasks }>Remove Done Tasks</button>
        <button type="button" className="btn" onClick={ deleteAllTasks }>Clear Tasks</button>
      </div>
      <TaskList />
    </>
  );
}

export default Home
