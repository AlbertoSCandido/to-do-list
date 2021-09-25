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
      <div className="d-flex f-d-column a-i-center gap-1">
        <h1 className="title">To-do List &#x02713;</h1>
        <div>
          <input
            type="text"
            value={task.task}
            className="inputTask"
            placeholder="Add a task"
            onChange={e => setTask({ task: e.target.value, id: Date.now() })}
            onKeyPress={e => e.key === 'Enter' && addTask()}
          />
          <button type="button" className="btn add-btn" onClick={ addTask }>Add task</button>
        </div>
        <div>
        <button type="button" className="btn danger" onClick={ changeDoneTask}>Finish / Unfinish</button>
        <button type="button" className="btn danger" onClick={ deleteDoneTasks }>Remove Done Tasks</button>
        <button type="button" className="btn danger" onClick={ deleteAllTasks }>Clear Tasks</button>
        </div>
      </div>
      <TaskList />
    </div>
  );
}

export default Home
