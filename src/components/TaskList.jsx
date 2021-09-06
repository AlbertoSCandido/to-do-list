import React from 'react';
import context from '../context';

const TaskList = () => {
  const { list,
    setList,
    selectedTask,
    setSelectedTask,
    doneTasks,
  } = React.useContext(context);

  const [taskId, setTaskId] = React.useState(null);
  const [taskText, setTaskText] = React.useState(null);

  const updateTask = () => {
    setList(list.map((task) => {
      if (task.id === taskId) {
        const editedTask = task;
        editedTask.task = taskText;
        return editedTask;
      }
      return task;
    }));
    setTaskId(null);
  }


  return (
    <ul className='taskList'>
      { list.map(({ id, task }) => {
        return taskId === id ? (
          <>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <button onClick={ updateTask }>Save</button>
          </>
        ) : (
          <li
            key={id}
            className={ `${id === selectedTask ? 'selected' : ''} ${doneTasks.includes(id) ? 'doneTask': ''}` }
            onClick={() => { selectedTask === id ? setSelectedTask(null) : setSelectedTask(id) }}
          >
            {task}
            <button type="button" onClick={() => { setTaskId(id); setTaskText(task) } }>Edit</button>
            <button type="button" onClick={() => { setList(list.filter((task) => task.id !== id)) }}>Delete</button>
          </li>
        )
      }
      ) }

    </ul>
  )
}

export default TaskList;
