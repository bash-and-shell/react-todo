import './App.scss';
import { Container, Tab, TabContainer, Tabs } from 'react-bootstrap';
import AddTask from './components/AddTask.js';
import "bootstrap/dist/css/bootstrap.css";
import Task from './components/Task.js';
import TaskList from './components/TaskList';
import EditLists from './components/EditLists';
import { useEffect, useState } from 'react';


const App = () => {

  const [tasks, setTasks] = useState([])
  const [lists, setLists] = useState(['All'])
  const [tabKey, setTabKey] = useState(lists[0])
  const [canChangeLists, setCanChangeLists] = useState(false)

  useEffect(() => {
    if(lists.length > 1)
      setCanChangeLists(true)
  }, [lists])

  useEffect(() => {
    if(tabKey === 'All')
      setCanChangeLists(false)
  }, [tabKey])

  const completeItem = (index) => {
    let newTasks = tasks
    const task = newTasks[index]
    
    task.completed = !task.completed

    newTasks[index] = task

    setTasks(newTasks)
  }


  const addTask = (t) => {    
    const task = {
      id: tasks.length,
      list: tabKey,
      value: t,
      completed: false
    }

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

  const addList = (list) => {
    if(lists.includes(list)) 
      return false;
    
    setLists([...lists, list])
  }

  const editList = (newName) => {
    if(lists.includes(newName)) 
      return false;

    let updateLists = lists;
    let updateTasks = tasks;

    updateTasks.forEach((task, index) =>{
      if(task.list === tabKey) {
        task.list = newName;
      }
    })

    updateLists[updateLists.indexOf(tabKey)] = newName;
   
    setTasks(updateTasks)
    setLists(updateLists)
    setTabKey(newName)
  }

  const deleteList = () => {
    let updateTasks = [];

    tasks.forEach((task) =>{
      if(task.list !== tabKey) {
        updateTasks.push(task)
      }
    })
    
    let updateLists = lists
    updateLists = updateLists.splice(updateLists.indexOf(tabKey), 1)

    
    setTasks(updateTasks)
    setLists(updateLists)
  }
  

  return (
    <div className="App">
      <Container component="main" maxWidth="xs">
        <AddTask onSubmit={addTask} enabled={canChangeLists} />
        <EditLists type="New" onSubmit={list => addList(list)} />
        <EditLists type="Edit" onSubmit={list => editList(list)} />
        <EditLists type="Delete" onSubmit={list => deleteList(list)} />
        <Tabs
          id="tab-list"
          activeKey={tabKey}
          onSelect={k => setTabKey(k)}
        >
          <Tab eventKey='All' title='All'>
            <TaskList>
              {tasks.map((task, index) => {
                return <Task id={task.id} key={index} list={task.list} text={task.value} handleDelete={deleteTask} handleEdit={editTask} completed={task.completed} onCheck={completeItem}/>
              })}
            </TaskList>
          </Tab>

          {lists.map((list, listIndex) =>{
            if(listIndex === 0) return;
            return (
              <Tab key={listIndex} eventKey={list} title={list}>
            <TaskList>
              {tasks.map((task, index) => {
                if(task.list === lists[listIndex]){
                  return <Task id={task.id} key={index} list={task.list} text={task.value} handleDelete={deleteTask} handleEdit={editTask} completed={task.completed} onCheck={completeItem}/>
                }
              })}
            </TaskList>
          </Tab>
            )
          })}

        </Tabs>


      </Container>

    </div>
  );
}

export default App;
