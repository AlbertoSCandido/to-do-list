import React from 'react';
import context from '../context';

const TaskList = () => {
  const { list,
    selectedTask,
    setSelectedTask,
    doneTasks,
  } = React.useContext(context);

  return (
    <ul>
      { list.map(({ id, task }) => (
        <li
          key={id}
          className={ `${id === selectedTask ? 'selected' : ''} ${doneTasks.includes(id) ? 'doneTask': ''}` }
          onClick={() => { selectedTask === id ? setSelectedTask(null) : setSelectedTask(id) }}
        >
          {task}
        </li>
      )) }
    </ul>
  )
}

export default TaskList
