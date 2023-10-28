import './App.scss';
import { Container } from 'react-bootstrap';
import AddTask from './components/AddTask.js';
import "bootstrap/dist/css/bootstrap.css";
import Task from './components/Task.js';
import TaskList from './components/TaskList';
import { useState } from 'react';

const App = () => {

  const [tasks, setTasks] = useState([])
  
  const addTask = (task) => {
    setTasks([...tasks, task])
  }

  const deleteTask = (task) => {
    const updateTasks = [...tasks]
    updateTasks.splice(task, 1)
    setTasks(updateTasks)
  }

  const editTask = (task) => {
    const edit = prompt('Edit task:');
    if (edit !== null && edit.trim() !== '') {
      let updateTasks = [...tasks]
      updateTasks[task] = edit
      setTasks(updateTasks)
    }
  }

  return (
    <div className="App">
      <Container component="main" maxWidth="xs">
      <AddTask onSubmit={addTask}/>
      
      <TaskList>
        {tasks.map((task, index)=> {
          return <Task key={index} text={task} handleDelete={deleteTask} handleEdit={editTask}/>
        })}
      </TaskList>
      </Container>
     
    </div>
  );
}

export default App;
