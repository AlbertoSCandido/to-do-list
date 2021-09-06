import React from 'react'
import TaskList from '../components/TaskList';
import context from '../context';

const Home = () => {
  const { 
    addItem,
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
    <div className="app">
      <div>
        To-do List
        <div>
          <input
            type="text"
            value={task.task}
            onChange={e => setTask({ task: e.target.value, id: Date.now() })}
          />
          <button type="button" className="btn" onClick={ addTask }>Add task</button>
        </div>
        <div>
        <button type="button" className="btn" onClick={ changeDoneTask}>Finish / Unfinish</button>
        <button type="button" className="btn" onClick={ deleteDoneTasks }>Remove Done Tasks</button>
        <button type="button" className="btn" onClick={ deleteAllTasks }>Clear Tasks</button>
        </div>
      </div>
      <TaskList />
    </div>
  );
}

export default Home
