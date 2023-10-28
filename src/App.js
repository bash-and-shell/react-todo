import './App.scss';
import { Container } from 'react-bootstrap';
import AddTask from './components/AddTask.js';
import "bootstrap/dist/css/bootstrap.css";
import Task from './components/Task.js';
import TaskList from './components/TaskList';
import { useState } from 'react';

const App = () => {

  const [tasks, setTasks] = useState(["Example Task 1"])
  
  const addTask = (task) => {
    setTasks([...tasks, task])
  }

  const removeTask = (task) => {

  }

  const editTask = (task) => {

  }

  return (
    <div className="App">
      <Container component="main" maxWidth="xs">
      <AddTask onSubmit={addTask}/>
      
      <TaskList>
        {tasks.map((task, index)=> {
          return <Task index={index} text={task}/>
        })}
      </TaskList>
      </Container>
     
    </div>
  );
}

export default App;
