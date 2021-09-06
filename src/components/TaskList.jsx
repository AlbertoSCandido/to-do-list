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
    <div className='taskList'>
      <h3 className="d-flex j-c-spAround a-i-center"><h2>{list.length} tasks</h2> {list.length - doneTasks.length} remain</h3>
      { list.map(({ id, task }) => {
        return taskId === id ? (
          <>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <div>
              <button onClick={ updateTask }>Save</button>
              <button onClick={() => {setTaskId(null)}}>Cancel</button>
            </div>
          </>
        ) : (
          <div
            key={id}
            className={ `${id === selectedTask ? 'selected' : ''} ${doneTasks.includes(id) ? 'doneTask': ''} d-flex j-c-spAround a-i-center` }
            onClick={() => { selectedTask === id ? setSelectedTask(null) : setSelectedTask(id) }}
          >
            {task}
            <div>
              <button type="button" className="btn-task" onClick={() => { setTaskId(id); setTaskText(task) } }>Edit</button>
              <button type="button" className="btn-task" onClick={() => { setList(list.filter((task) => task.id !== id)) }}>Delete</button>
            </div>
          </div>
        )
      }
      ) }

    </div>
  )
}

export default TaskList;
