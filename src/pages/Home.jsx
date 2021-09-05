import React from 'react'

const Home = () => {
  const [task, setTask] = React.useState(' ');

  return (
    <>
      <div className="App">
        To-do List
        <div>
          <input
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <button type="button" className="btn">Add task</button>
        </div>
      </div>
    </>
  )
}

export default Home
