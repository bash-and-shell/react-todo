import './App.scss';
import { Container, Tab, Tabs } from 'react-bootstrap';
import AddTask from './components/AddTask.js';
import "bootstrap/dist/css/bootstrap.css";
import Task from './components/Task.js';
import TaskList from './components/TaskList';
import NewList from './components/NewList';
import { useState } from 'react';


const App = () => {

  const [tasks, setTasks] = useState([])
  const [tabKey, setTabKey] = useState('all')

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

  const addList = () => {
    
  }

  return (
    <div className="App">
      <Container component="main" maxWidth="xs">
        <AddTask onSubmit={addTask} />
        <NewList onSubmit={(e) => {console.log(e)}} />
        <Tabs
          id="tab-list"
          activeKey={tabKey}
          onSelect={k => setTabKey(k)}
        >
          <Tab eventKey='all' title='All'>
            <TaskList>
              {tasks.map((task, index) => {
                return <Task key={index} text={task} handleDelete={deleteTask} handleEdit={editTask} />
              })}
            </TaskList>
          </Tab>
        </Tabs>


      </Container>

    </div>
  );
}

export default App;
