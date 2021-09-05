import React from 'react';
import context from '../context';

const TaskList = () => {
  const { list } = React.useContext(context);
  console.log(list);
  console.log('x');
  return (
    <div>
      { list.map(task => <div key={task.id}>{task.task}</div>) }
    </div>
  )
}

export default TaskList
