import React from 'react';
import context from '../context';

const TaskList = () => {
  const { list,
    setList,
    selectedTask,
    setSelectedTask,
    doneTasks,
    deleteDoneTask,
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
    setSelectedTask(null);
  }


  return (
    <div className='taskList p-1 d-flex f-d-column'>
      <h3 className="d-flex j-c-spAround a-i-center"><h2>{list.length} tasks</h2> {list.length - doneTasks.length} remain</h3>
      { list.map(({ id, task }) => {
        return taskId === id ? (
          <div className="d-flex j-c-spBetween a-i-center m-x-2">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && updateTask()}
              className="input-edt"
            />
            <div>
              <button className="btn-task" onClick={ updateTask }>Save</button>
              <button className="btn-task" onClick={() => {setTaskId(null)}}>Cancel</button>
            </div>
          </div>
        ) : (
          <div
            key={id}
            className={ `${id === selectedTask ? 'selected' : ''} ${doneTasks.includes(id) ? 'doneTask': ''} d-flex j-c-spBetween a-i-center m-x-2 f-wrap` }
            onClick={() => { selectedTask === id ? setSelectedTask(null) : setSelectedTask(id) }}
          >
            <p>{task}</p>
            <div className="s-c-end">
              <button type="button" className="btn-task" onClick={() => { setTaskId(id); setTaskText(task) } }>Edit</button>
              <button
                type="button"
                className="btn-task"
                onClick={() => { setList(list.filter((task) => task.id !== id)); deleteDoneTask(id); }}
              >
                Delete
              </button>
            </div>
          </div>
        )
      }
      ) }

    </div>
  )
}

export default TaskList;
