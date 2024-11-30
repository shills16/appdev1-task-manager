import { useState } from 'react'
import TaskLists from './components/TaskLists'

function App() {
  const [user, setUser] = useState('Shiela M')

  return (
    <div>
      <h1>Task Manager</h1>
      {user ? (
        <TaskLists user={user} />
      ) : (
        <p>You must login to view the task lists</p>
      )}
    </div>
  );
};

export default App;

