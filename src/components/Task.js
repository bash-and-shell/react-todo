import './scss/Task.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from "react";
import { Button } from 'react-bootstrap';

const Task = (props) => {

  const {text, index, handleDelete, handleEdit, ...rest} = props;

  return (<ListGroup.Item index={index} className="task">
 <div className='task-text'>
      {props.text}
    </div>
    <span className="task-buttons">
      <Button variant="light" onClick={handleEdit}>Edit</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </span> 
  </ListGroup.Item>
   
  );  
}

export default Task;
