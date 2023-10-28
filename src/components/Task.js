import './scss/Task.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from "react";
import { Button } from 'react-bootstrap';

const Task = (props) => {

  const {text, ...rest} = props;
  return (<div className="task">
 <ListGroup.Item className='task-text'>
      {props.text}
    </ListGroup.Item>
    <span className="task-buttons">
      <Button variant="light">Edit</Button>
      <Button variant="danger">Delete</Button>
    </span> 
  </div>
   
  );  
}

export default Task;
