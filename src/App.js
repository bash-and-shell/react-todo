import './App.scss';
import { Container, Tab, TabContainer, Tabs, Row, Col } from 'react-bootstrap';
import AddTask from './components/AddTask.js';
import "bootstrap/dist/css/bootstrap.css";
import Task from './components/Task.js';
import TaskList from './components/TaskList';
import EditLists from './components/EditLists';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const App = (props) => {
  const [tasks, setTasks] = useState(props.task)
  const [lists, setLists] = useState(props.lists)
  const [tabKey, setTabKey] = useState(props.tabKey)
  const [canChangeLists, setCanChangeLists] = useState(props.canChange)

  useEffect(() => {
    if (tabKey !== 'All')
      setCanChangeLists(true)
    if (tabKey === 'All')
      setCanChangeLists(false)
  }, [tabKey])

  const completeItem = (i) => {
    let newTasks = tasks

    const index = newTasks.findIndex(t => t.id === i)
    const task = newTasks[index]

    task.completed = !task.completed

    newTasks[index] = task

    setTasks(newTasks)
  }


  const addTask = (t) => {
    const task = {
      id: uuidv4(),
      list: tabKey,
      value: t,
      completed: false
    }

    setTasks([...tasks, task])
  }

  const deleteTask = (task) => {
    const updateTasks = [...tasks]
    const index = updateTasks.findIndex(t => t.id === task)
    updateTasks.splice(index, 1)
    setTasks(updateTasks)
  }

  const editTask = (task, value) => {
    let updateTasks = tasks
    const index = updateTasks.findIndex(t => t.id === task)
    updateTasks[index].value = value
    setTasks([...updateTasks])
  }

  const addList = (list) => {
    if (lists.includes(list))
      return false;

    setLists([...lists, list])
    setTabKey(list)
  }

  const editList = (newName) => {
    if (lists.includes(newName))
      return false;

    let updateLists = lists;
    let updateTasks = tasks;

    updateTasks.forEach((task, index) => {
      if (task.list === tabKey) {
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

    tasks.forEach((task) => {
      if (task.list !== tabKey) {
        updateTasks.push(task)
      }
    })

    let updateLists = lists
    updateLists.splice(updateLists.indexOf(tabKey), 1)

    setTasks(updateTasks)
    setLists(updateLists)
    setTabKey('All')
  }


  return (
    <div className="App">
      <Container component="main" >

        <Row>
          <Col>
            <EditLists type="New" onSubmit={list => addList(list)} />
          </Col>
          <Col>
            <EditLists type="Edit" onSubmit={list => editList(list)} enabled={canChangeLists} />
          </Col>
          <Col>
            <EditLists type="Delete" onSubmit={list => deleteList(list)} currentList={tabKey} enabled={canChangeLists} />
          </Col>
        </Row>

        <Tabs
          id="tab-list"
          activeKey={tabKey}
          onSelect={k => setTabKey(k)}
        >
          <Tab eventKey='All' title='All'>
            <TaskList>
              {tasks.map((task, index) => {
                return <Task id={task.id} key={index} withList={true} list={task.list} text={task.value} handleDelete={deleteTask} handleEdit={editTask} completed={task.completed} onCheck={completeItem} />
              })}
            </TaskList>
          </Tab>

          {lists.map((list, listIndex) => {
            if (listIndex === 0) return;
            return (
              <Tab key={listIndex} eventKey={list} title={list}>
                <TaskList>
                  {tasks.map((task, index) => {
                    if (task.list === lists[listIndex]) {
                      return <Task id={task.id} key={index} list={task.list} text={task.value} handleDelete={deleteTask} handleEdit={editTask} completed={task.completed} onCheck={completeItem} />
                    }
                  })}
                </TaskList>
              </Tab>
            )
          })}

        </Tabs>

        {canChangeLists && <Row>
          <AddTask onSubmit={addTask} enabled={canChangeLists} />

        </Row>}
      </Container>

    </div>
  );
}

export default App;
