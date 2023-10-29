import './scss/Task.scss';
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const Task = (props) => {

  const {text, index, handleDelete, handleEdit } = props;
  const [checked, setChecked] = useState(false)

  const handleCheck = () => {
    setChecked(!checked)
  }

  // useEffect(() => {

  // }, [checked])

  return (<ListGroup.Item key={index} className="task">
  <Form.Check  className={`task-text${checked ? ' strikethrough' : ''}`} type='checkbox' label={text} value={checked} onChange={(e) => {handleCheck()}} />
    <span className="task-buttons">
      <Button variant="light" onClick={() => handleEdit(index)}>Edit</Button>
      <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
    </span> 
  </ListGroup.Item>
   
  );  
}

export default Task;
