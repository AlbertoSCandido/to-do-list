import React from 'react'
import TaskList from '../components/TaskList';
import context from '../context';

const Home = () => {
  const { addItem } = React.useContext(context);
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
      </div>
      <TaskList />
    </>
  )
}

export default Home
